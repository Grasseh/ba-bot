const Restraint = require('../restraint');
const Bound = require('../../status/bound');
const Harnessed = require('../../status/harnessed');
const Mittened = require('../../status/mittened');

class LatexMittens extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Arms';
        this.name = 'Latex Mittens';
        this.command = 'latexmittens';
        this.difficulty = difficulty;
        this.statusTable = [
            [],
            [Bound],
            [Harnessed],
            [Mittened],
            [Mittened]
        ];
    }

    getDescription(){
        let descriptions = {
            Easy : 'Wrist-length latex gloves -- No Effect',
            Medium : 'Elbow length thicker gloves -- Bound',
            Hard : 'Shoulder-length paw-gloves that make it hard to grip things -- Harnessed',
            Extreme : 'Mitten paws fold against the shoulders, pushing the hands against the back of the neck and merging together -- Mittened',
            Impossible : 'Mitten paws fold against the shoulders, pushing the hands against the back of the neck and merging together -- Mittened',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexMittens;