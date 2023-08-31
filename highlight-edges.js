
AFRAME.registerComponent('highlight-edges', {
    schema: {
        opacity: {default: '1'}
    },
    init: function () {
        const boxGeometry = this.el.getAttribute('geometry');
        if (boxGeometry && boxGeometry.primitive === 'box') {
            this.highlightEdges(boxGeometry.width, boxGeometry.height, boxGeometry.depth);
        }
    },
    highlightEdges: function (width, height, depth) {
        // Define the corner points of the box
        const corners = [
            { x: -width / 2, y: -height / 2, z: -depth / 2 },
            { x: width / 2, y: -height / 2, z: -depth / 2 },
            { x: -width / 2, y: height / 2, z: -depth / 2 },
            { x: width / 2, y: height / 2, z: -depth / 2 },
            { x: -width / 2, y: -height / 2, z: depth / 2 },
            { x: width / 2, y: -height / 2, z: depth / 2 },
            { x: -width / 2, y: height / 2, z: depth / 2 },
            { x: width / 2, y: height / 2, z: depth / 2 }
        ];

        // Define pairs of corner points that represent the edges
        const edgePairs = [
            [0, 1], [0, 2], [1, 3], [2, 3],
            [4, 5], [4, 6], [5, 7], [6, 7],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        // Create line entities to represent the edges
        for (const pair of edgePairs) {
            const startPoint = corners[pair[0]];
            const endPoint = corners[pair[1]];

            const line = document.createElement('a-entity');
            line.setAttribute('line', {
                start: `${startPoint.x} ${startPoint.y} ${startPoint.z}`,
                end: `${endPoint.x} ${endPoint.y} ${endPoint.z}`,
                color: this.el.getAttribute('material').color,
                opacity: this.data.opacity
            });

            this.el.appendChild(line);
        }
    }
});