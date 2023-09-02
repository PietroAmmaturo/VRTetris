AFRAME.registerComponent('join-on-collision', {
    schema: {
        wrapper: { type: 'selector', default: '[layer-check]' },
        elementsToJoin: { type: 'string', default: 'a-box' }
    },
    init: function () {
        this.fired = false;
        const el = this.el;
        const wrapper = this.data.wrapper;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            [...el.querySelectorAll(this.data.elementsToJoin)].forEach(child => {
                const stillChild = document.createElement('a-entity');
                const oldPos = child.getAttribute('position');
                stillChild.setAttribute('position', {
                    x: el.object3D.position.x + oldPos.x,
                    y: el.object3D.position.y + oldPos.y,
                    z: Math.round(el.object3D.position.z + oldPos.z)
                });
                stillChild.setAttribute('material', child.getAttribute('material'));
                stillChild.setAttribute('material', 'opacity', 1);
                stillChild.setAttribute('geometry', child.getAttribute('geometry'));
                stillChild.setAttribute('scale', child.getAttribute('scale'));
                stillChild.classList.add('collidable');
                wrapper.appendChild(stillChild);
            });
            //el.parentNode.removeChild(el);
        });
    },
});