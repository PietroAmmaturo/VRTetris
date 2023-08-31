AFRAME.registerComponent('destroy-on-collision', {
    schema: {
        timer: { type: 'number', default: 1000 },
    },
    init: function () {
        this.fired = false;
        const el = this.el;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            setTimeout(() => el.parentElement.removeChild(el), this.data.timer);
        });
    },
});