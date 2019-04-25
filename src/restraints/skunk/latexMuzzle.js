const Restraint = require('../restraint');

class LatexMuzzle extends Restraint{
    constructor(difficulty){
        super();
        this.location = "Head";
        this.name = "Latex Muzzle";
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : "Latex ball fills the mouth. -- Gagged",
            Medium : "Latex spreads to form a half-mask over the ballgag. -- Gagged",
            Hard : "The latex becomes a full-face mask with a cute snout. -- Gagged & Blinded",
            Extreme : "Latex spreads over the whole head in a hood, forming a skunk muzzle. -- Hooded",
            Impossible : "Latex spreads over the whole head in a hood, forming a skunk muzzle. -- Hooded",
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexMuzzle;