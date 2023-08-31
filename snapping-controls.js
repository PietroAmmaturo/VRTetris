
AFRAME.registerComponent('snapping-controls', {
    schema: {
        snapValue: { default: 1 },
        border: { default: 3 },
        moveKeys: { default: ['w', 'a', 's', 'd'] },
        rotateKeys: { default: ['arrowleft', 'arrowup', 'arrowright'] },
        active: { default: true },
        targets: { default: 'a-box'},
        fastKey: { default: 'shift'},
        collidables: { default: '.collidable'},
        enablevr: { default: true},
        vrSelector: { default: '[generic-tracked-controller-controls]'}
    },
    init: function () {
        this.movingDirection = new THREE.Vector3();
        this.minX = -this.data.border * this.data.snapValue;
        this.maxX = this.data.border * this.data.snapValue;
        this.minY = -this.data.border * this.data.snapValue;
        this.maxY = this.data.border * this.data.snapValue;
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        if (this.data.enablevr) this.setUpVR();
    },
    setUpVR: function(event) {
        document.querySelectorAll(this.data.vrSelector).forEach(el => el.addEventListener('buttondown', (evt) => {
            const intersectedEls = el.components.raycaster.intersectedEls;
            if (intersectedEls && intersectedEls[0]) {
                const deltaX = intersectedEls[0].object3D.position.x -this.el.object3D.position.x;
                const deltaY = intersectedEls[0].object3D.position.y - this.el.object3D.position.y;
                this.moveEntity(deltaX, deltaY);
            }
        }
        ))
    },
    onKeyDown: function (event) {
        if (!this.data.active) return;
        const key = event.key.toLowerCase();
        if (this.data.moveKeys.includes(key)) {
            event.preventDefault();
            this.move(key);
        } else if (this.data.rotateKeys.includes(key)) {
            event.preventDefault();
            this.rotate(key);
        } else if (this.data.fastKey == key) {
            event.preventDefault();
            if (this.el.getAttribute('falling'))
            this.el.setAttribute('falling', 'speed', 0.01);
        }
    },
    onKeyUp: function (event) {
        if (!this.data.active) return;
        const key = event.key.toLowerCase();
        if (this.data.fastKey == key) {
            event.preventDefault();
            if (this.el.getAttribute('falling'))
            this.el.setAttribute('falling', 'speed', 0.001);
        }
    },
    move: function (key) {
        switch (key) {
            case this.data.moveKeys[0]:
                this.moveEntity(0, this.data.snapValue);
                break;
            case this.data.moveKeys[1]:
                this.moveEntity(-this.data.snapValue, 0);
                break;
            case this.data.moveKeys[2]:
                this.moveEntity(0, -this.data.snapValue);
                break;
            case this.data.moveKeys[3]:
                this.moveEntity(this.data.snapValue, 0);
                break;
            default:
                break;
        }
    },
    rotate: function (key) {
        switch (key) {
            case this.data.rotateKeys[0]:
                this.rotateEntity(Math.PI / 2, 'z');
                break;
            case this.data.rotateKeys[1]:
                this.rotateEntity(-Math.PI / 2, 'x');
                break;
            case this.data.rotateKeys[2]:
                this.rotateEntity(-Math.PI / 2, 'y');
                break;
            default:
                break;
        }
    },
    rotateEntity: function (deltaRad, direction) {
        const oldParentPosition = this.el.getAttribute('position');
        const children = this.el.querySelectorAll(this.data.targets);
        const collidables  = document.querySelectorAll(this.data.collidables);
        let rotationMatrix = new THREE.Matrix4();
        
        switch (direction) {
            case 'x':
                rotationMatrix.makeRotationX(deltaRad);
                break;
            case 'y':
                rotationMatrix.makeRotationY(deltaRad);
                break;
            case 'z':
                rotationMatrix.makeRotationZ(deltaRad);
                break;
            default:
                break;
        }
        const newChildPositionsRelativeToParent = Array.from(children).map(child => {
            const oldChildPosition = child.getAttribute('position');
                // Clone the position to avoid modifying the original object
            const rotatedPosition = new THREE.Vector3(oldChildPosition.x, oldChildPosition.y, oldChildPosition.z);
            rotatedPosition.applyMatrix4(rotationMatrix);
            return {
                x: rotatedPosition.x,
                y: rotatedPosition.y,
                z: rotatedPosition.z
            };
        });
        const newMaxZ = Array.from(newChildPositionsRelativeToParent).map(pos => parseFloat(pos.z)).reduce((max, z) => Math.max(max, z), 0);
        const newChildPositions = newChildPositionsRelativeToParent.map(pos => {pos.z = pos.z - newMaxZ; return pos;}).map(pos => {
            return {
                x: oldParentPosition.x + pos.x,
                y: oldParentPosition.y + pos.y,
                z: oldParentPosition.z + pos.z
            };
        });
        if (!this.checkPositions(newChildPositions, collidables)) return;

        for (let i = 0; i < children.length; i++) children[i].setAttribute('position', newChildPositionsRelativeToParent[i]);
    },
    moveEntity: function (deltaX, deltaY) {
        const oldParentPosition = this.el.getAttribute('position');
        const children = this.el.querySelectorAll(this.data.targets);
        const collidables  = document.querySelectorAll(this.data.collidables);
        const newChildPositions = Array.from(children).map(child => {
            const oldChildPosition = child.getAttribute('position');
            return {
                x: oldParentPosition.x + oldChildPosition.x + deltaX,
                y: oldParentPosition.y + oldChildPosition.y + deltaY,
                z: oldParentPosition.z + oldChildPosition.z // Keep the z position unchanged
            };
        });
        if (!this.checkPositions(newChildPositions, collidables)) return;
        this.el.object3D.position.copy({x: oldParentPosition.x + deltaX, y: oldParentPosition.y + deltaY, z: oldParentPosition.z});
    },
    checkPositions: function (newChildPositions, collidables) {
        for (let i = 0; i < newChildPositions.length; i++) {
            if (newChildPositions[i].x > this.maxX || newChildPositions[i].x < this.minX || newChildPositions[i].y > this.maxY || newChildPositions[i].y < this.minY) return false;
            for (let j = 0; j < collidables.length; j++) {
                const collPos = new THREE.Vector3();
                collidables[j].object3D.getWorldPosition(collPos);
                const collV = {x: collPos.x, y:  collPos.y, z:  collPos.z};
                const newV = {x: newChildPositions[i].x, y: newChildPositions[i].y, z: Math.round(newChildPositions[i].z)};
                if (collV.x == newV.x && collV.y == newV.y && collV.z == newV.z) return false;
            }
        }
        return true;
    }
});