AFRAME.registerComponent('restart-on-collision', {
    schema: {
        arena: { type: 'selector', default: '[arena]' },
        pieceSettings: {}
    },
    init: function () {
        this.fired = false;
        const el = this.el;
        const arena = this.data.arena;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            const pieceEl = document.createElement('a-entity');
            pieceEl.setAttribute("piece", this.data.pieceSettings);
            arena.appendChild(pieceEl);
        });
    },
});