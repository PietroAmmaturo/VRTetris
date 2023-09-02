// components checking if any of its children are above a cerain height
AFRAME.registerComponent('height-check', {
    schema: {
        maxHeight: { default: 10 },
    },
    init: function () {
        this.end = false;
        this.checkHeight();
    },
    checkHeight: function () {
        if (this.end) return;
        const elements = Array.from(this.el.children);
        for (const element of elements) {
            if (element.object3D.position.z >= this.data.maxHeight) {
                this.end = true;
                if(!window.alert('GAME OVER, SCORE: ' + score)){window.location.reload();}
                break;
            }
        }
    },
    tick: function (time, timeDelta) {
        this.checkHeight();
    },
});