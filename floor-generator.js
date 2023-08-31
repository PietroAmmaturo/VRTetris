AFRAME.registerComponent('floor-generator', {
    schema: {
        border: { type: 'number', default: 3 }, // Size of the grid (nxn)
        boxColor: { type: 'color', default: '#444444' } // Black color
    },
    init: function () {
        const offset = this.data.border;
        const boxColor = this.data.boxColor;

        for (let x = -offset; x <= offset; x++) {
            for (let y = -offset; y <= offset; y++) {
                const box = document.createElement('a-box');
                box.setAttribute('position', `${x} ${y} 0`);
                box.setAttribute('width', 1);
                box.setAttribute('height', 1);
                box.setAttribute('depth', 1);
                box.setAttribute('color', boxColor);
                box.classList.add('collidable');
                this.el.appendChild(box);
            }
        }
    }
});