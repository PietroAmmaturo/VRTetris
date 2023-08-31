AFRAME.registerComponent('restart-on-collision', {
    schema: {
        arena: { type: 'selector', default: '[arena]' },
        startingPoint: { type: 'string', default: '0 0 15' }
    },
    init: function () {
        this.fired = false;
        const el = this.el;
        const arena = this.data.arena;
        const startingPoint = this.data.startingPoint;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            const pieceEl = document.createElement('a-entity');
            pieceEl.setAttribute('position', startingPoint);
            pieceEl.setAttribute("piece", '');
            arena.appendChild(pieceEl);
        });
    },
});