AFRAME.registerComponent('destroy-on-collision', {
    schema: {
        timer: { type: 'number', default: 100 },
    },
    init: function () {
        this.fired = false;
        const el = this.el;
        const timer = this.data.timer;
        el.addEventListener('collision', () => {
            if (this.fired) return;
            this.fired = true;
            setTimeout(() => el.parentElement.removeChild(el), timer);
        });
    },
});