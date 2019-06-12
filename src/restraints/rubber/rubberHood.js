const Restraint = require('../restraint');
const Blinded = require('../../status/blinded');
const Gagged = require('../../status/gagged');
const Hooded = require('../../status/hooded');

class RubberHood extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = "Head";
        this.name = "Rubber Hood";
        this.command = "rubberhood";
        this.statusTable = [
            [Gagged],
            [Gagged],
            [Gagged, Blinded],
            [Hooded],
            [Hooded]
        ];
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : "Rubber forms over the head, slipping into the mouth. -- Gagged",
            Medium : "Rubber spreads over the head, running over every inch of flesh. -- Gagged",
            Hard : "Rubber forms over the rest of the face, spreading over the eyes. -- Gagged & Blinded",
            Extreme : "Rubber covers the entire head, forming one faceless rubber ball. -- Hooded",
            Impossible : "Rubber covers the entire head, forming one faceless rubber ball. -- Hooded",
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = RubberHood;