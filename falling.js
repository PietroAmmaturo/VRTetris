AFRAME.registerComponent('falling', {
    schema: {
        speed: { default: 0.001 }
    },
    init: function () {
    },
    tick: function (time, deltaTime) {
        // Move the camera downwards
        const currentPosition = this.el.getAttribute('position');
        const newPosition = {
            x: currentPosition.x,
            y: currentPosition.y,
            z: currentPosition.z - (this.data.speed * deltaTime)
        };
        this.el.setAttribute('position', newPosition);
    }
});