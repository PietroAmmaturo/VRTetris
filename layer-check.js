AFRAME.registerComponent('layer-check', {
    schema: {
        border: { default: 3 },
        scoreSelector: { type: 'selector', default: '#bonusScore' },
    },
    init: function () {
        this.score = 0;
        this.checkGroup();
    },
    checkGroup: function () {
        const elements = Array.from(this.el.children);
        const requiredCount = Math.pow((this.border * 2 + 1), 2);
        if (elements.length >= requiredCount) {
            let foundCounter = 0;
            // Create a dictionary to group elements by z position
            const groupedElements = new Map();
            // Iterate through each element and group them by z position
            elements.forEach(element => {
                const zPosition = element.object3D.position.z;
                if (!groupedElements.has(zPosition)) {
                    groupedElements.set(zPosition, []);
                }
                groupedElements.get(zPosition).push(element);
            });
            // Extract and sort the z positions
            const sortedZPositions = Array.from(groupedElements.keys())
                .map(parseFloat) // Convert keys to numbers
                .sort((a, b) => a - b);
            sortedZPositions.forEach(position => {
                const group = groupedElements.get(position);
                // lower higher elements
                if (foundCounter > 0) group.forEach(groupElement => groupElement.object3D.position.z -= 1);
                // delete the group and increase the counter
                if (group.length >= requiredCount) {
                    group.forEach(groupElement => groupElement.parentNode.removeChild(groupElement));
                    foundCounter++;
                    this.score += foundCounter;
                    this.data.scoreSelector.setAttribute('text','value', this.score);
                }
            })
        }
    },
    tick: function (time, timeDelta) {
        // Call the checkGroup function on each tick for real-time updates
        this.checkGroup();
    },
});