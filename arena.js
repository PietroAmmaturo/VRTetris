AFRAME.registerComponent('arena', {
    init: function () {
        // Create a-floor entity with floor-generator component
        const floorEntity = document.createElement('a-entity');
        floorEntity.setAttribute('floor-generator', '');
        const pieceWrapperEntity = document.createElement('a-entity');
        pieceWrapperEntity.setAttribute('layer-check', '');
        pieceWrapperEntity.setAttribute('height-check', '');
        const pieceEntity = document.createElement('a-entity');
        pieceEntity.setAttribute('piece', '');
        pieceEntity.setAttribute('position', '0 0 15');
        pieceWrapperEntity.appendChild(pieceEntity);
        const scoreEntity = document.createElement('a-entity');
        scoreEntity.setAttribute('id', 'score');
        scoreEntity.setAttribute('scale', '5 5 5');
        scoreEntity.setAttribute('rotation', '90 0 0');
        scoreEntity.setAttribute('position', '-2 5 10');
        scoreEntity.setAttribute('text', 'value: 0; align: center; wrapCount: 9');
        const bonusScoreEntity = document.createElement('a-entity');
        bonusScoreEntity.setAttribute('id', 'bonusScore');
        bonusScoreEntity.setAttribute('scale', '5 5 5');
        bonusScoreEntity.setAttribute('rotation', '90 0 0');
        bonusScoreEntity.setAttribute('position', '2 5 10');
        bonusScoreEntity.setAttribute('text', 'value: 0; align: center; wrapCount: 9; color: red');
        this.el.appendChild(bonusScoreEntity);
        this.el.appendChild(scoreEntity);
        this.el.appendChild(pieceEntity);
        this.el.appendChild(floorEntity);
        this.el.appendChild(pieceWrapperEntity);
    }
});
