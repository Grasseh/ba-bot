const Restraint = require('../restraint');
const Blinded = require('../../status/blinded');
const Gagged = require('../../status/gagged');
const Hooded = require('../../status/hooded');

class LatexMuzzle extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Head';
        this.name = 'Latex Muzzle';
        this.command = 'latexmuzzle';
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
            Easy : 'Latex ball fills the mouth. -- Gagged',
            Medium : 'Latex spreads to form a half-mask over the ballgag. -- Gagged',
            Hard : 'The latex becomes a full-face mask with a cute snout. -- Gagged & Blinded',
            Extreme : 'Latex spreads over the whole head in a hood, forming a skunk muzzle. -- Hooded',
            Impossible : 'Latex spreads over the whole head in a hood, forming a skunk muzzle. -- Hooded',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexMuzzle;