AFRAME.registerComponent('floor-generator', {
    schema: {
        border: { type: 'number', default: 3 }, // Size of the grid (nxn)
        boxColor: { type: 'color', default: '#444444' }, // Black color
        slotSize: { type: 'number', default: 1 }, // Size of the grid (nxn)
    },
    init: function () {
        const offset = this.data.border;
        const boxColor = this.data.boxColor;

        for (let x = -offset; x <= offset; x++) {
            for (let y = -offset; y <= offset; y++) {
                const box = document.createElement('a-box');
                box.setAttribute('position', `${x * this.data.slotSize} ${y * this.data.slotSize} 0`);
                box.setAttribute('width', this.data.slotSize);
                box.setAttribute('height', this.data.slotSize);
                box.setAttribute('depth', this.data.slotSize);
                box.setAttribute('color', boxColor);
                box.classList.add('collidable');
                this.el.appendChild(box);
            }
        }
    }
});