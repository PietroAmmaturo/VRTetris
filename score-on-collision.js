AFRAME.registerComponent('score-on-collision', {
    schema: {
        selector: { type: 'selector', default: '#score' },
        elementsToCount: { type: 'string', default: 'a-box' }
    },
    init: function () {
        this.fired = false;
        this.score = 0;
        const el = this.el;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            const els = el.querySelectorAll(this.data.elementsToCount);
            this.score += els.length;
            this.data.selector.setAttribute('text','value', this.score);
        });
    },
});