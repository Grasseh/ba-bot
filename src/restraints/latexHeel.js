const Restraint = require('./restraint');

class LatexHeel extends Restraint{
    constructor(difficulty){
        super();
        this.location = "Legs";
        this.name = "Latex Heels";
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : "Ankle-high short heels -- No Effect",
            Medium : "Knee-high high-heeled boots -- Encumbered",
            Hard : "Thigh-high paw-shaped ballet boots keep the wearer unsteadily on their toes -- Hobbled",
            Extreme : "Legs are frogtied and folded against the butt, leaving the wearer to crawl around on their knees -- Incapacitated",
            Impossible : "Legs are frogtied and folded against the butt, leaving the wearer to crawl around on their knees -- Incapacitated",
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexHeel;