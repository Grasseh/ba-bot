const Restraint = require('../restraint');

class LatexMittens extends Restraint{
    constructor(difficulty){
        super();
        this.location = "Arms";
        this.name = "Latex Mittens";
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : "Wrist-length latex gloves -- No Effect",
            Medium : "Elbow length thicker gloves -- Bound",
            Hard : "Shoulder-length paw-gloves that make it hard to grip things -- Harnessed",
            Extreme : "Mitten paws fold against the shoulders, pushing the hands against the back of the neck and merging together -- Mittened",
            Impossible : "Mitten paws fold against the shoulders, pushing the hands against the back of the neck and merging together -- Mittened",
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexMittens;