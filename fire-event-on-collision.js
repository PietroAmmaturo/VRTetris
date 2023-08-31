AFRAME.registerComponent('fire-event-on-collision', {
    schema: {
        objects: { type: 'string', default: '.collidable' },
        eventName: { type: 'string', default: 'collision' },
        propagateTo: { type: 'string', default: '[falling]'},
        minYDistance: { type: 'number', default: 1.5 } // Minimum distance on the y-axis
    },
    tick: function () {
        const me = new THREE.Box3().setFromObject(this.el.object3D);
        const collidables = document.querySelectorAll(this.data.objects);
        
        const myCenter = new THREE.Vector3(); // Create a vector to store the center
        me.getCenter(myCenter);
        collidables.forEach((el) => {
            const boxCenter = new THREE.Vector3(); // Create a vector to store the center
            const box = new THREE.Box3().setFromObject(el.object3D);

            // Calculate the center of the bounding box and store it in myCenter
            box.getCenter(boxCenter);
            
            if (boxCenter.x != myCenter.x || boxCenter.y != myCenter.y) return;
            if (myCenter.z < boxCenter.z) return;

            // Calculate the vertical (y-axis) distance between centers
            const yDistance = myCenter.z - boxCenter.z;

            // Check for collision if the y-axis distance is below the threshold
            if (yDistance < this.data.minYDistance) {
                const target = document.querySelector(this.data.propagateTo);
                this.el.emit(this.data.eventName);
                if (target) target.emit(this.data.eventName);
                this.el.removeAttribute('fire-event-on-collision');
            }
        });
    },
});
