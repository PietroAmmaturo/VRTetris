AFRAME.registerComponent('piece', {
    schema: {
        pieceTimeout: { default: 100 },
        fallingTimeout: { default: 200 },
        controlsTimeout: { default: 200 },
        maxSize: { default: 3 },
        slotSize: { default: 1 },
    },
    init: function () {
        function createController(hand) {
            const controllerEntity = document.createElement('a-entity');
            controllerEntity.setAttribute('generic-tracked-controller-controls', `hand: ${hand}`);
            controllerEntity.setAttribute('raycaster', 'showLine: true; far: 100; interval: 0; objects: .collidable;');
            controllerEntity.setAttribute('line', 'color: lawngreen; opacity: 0.5');
            controllerEntity.setAttribute('visible', 'true');
            return controllerEntity;
        }

        const cameraEntity = document.createElement('a-entity');
        cameraEntity.setAttribute('camera', '');
        cameraEntity.setAttribute('look-controls', '');

        const leftControllerEntity = createController('left');
        const rightControllerEntity = createController('right');

        const rigEntity = document.createElement('a-entity');
        rigEntity.setAttribute('id', 'rig');
        rigEntity.setAttribute('position', '0 -1.6 5');
        rigEntity.appendChild(cameraEntity);
        rigEntity.appendChild(leftControllerEntity);
        rigEntity.appendChild(rightControllerEntity);

        this.el.appendChild(rigEntity);

        setTimeout(() => {
            this.el.setAttribute('join-on-collision', '');
            this.el.setAttribute('restart-on-collision', '');
            this.el.setAttribute('score-on-collision', '');
            this.el.setAttribute('destroy-on-collision', '');

            const heigth = Math.floor(Math.random() * this.data.maxSize) + 1;
            const width = Math.floor(Math.random() * this.data.maxSize) + 1;
            const depth = Math.floor(Math.random() * this.data.maxSize) + 1;

            // Generate a random color
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < heigth; j++) {
                    for (let k = 0; k < depth; k++) {
                        const box = document.createElement('a-box');
                        // Set the color and opacity
                        box.setAttribute('material', {
                            color: randomColor,
                            opacity: 0.2
                        });
                        box.setAttribute('position', {
                            x: i,
                            y: -j,
                            z: k
                        });
                        box.setAttribute('scale', {
                            x: this.data.slotSize,
                            y: this.data.slotSize,
                            z: this.data.slotSize
                        });
                        box.setAttribute('fire-event-on-collision', '');
                        box.setAttribute('highlight-edges', '');
                        this.el.appendChild(box);
                    }
                }
            }
        }, this.data.pieceTimeout);
        setTimeout(() => {
            this.el.setAttribute('falling', '');
        }, this.data.fallingTimeout);
        setTimeout(() => {
            this.el.setAttribute('snapping-controls', '');
            this.el.setAttribute('guide', '');
        }, this.data.controlsTimeout);
    },
});