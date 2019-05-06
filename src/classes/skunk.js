const playerClass = require('./playerClass');
const SummonLatexMuzzle = require('./spells/skunk/summonLatexMuzzle');
const SummonLatexHeels = require('./spells/skunk/summonLatexHeels');
const SummonLatexMittens = require('./spells/skunk/summonLatexMittens');
const SummonLatexCorset = require('./spells/skunk/summonLatexCorset');
const LatexHug = require('./spells/skunk/latexHug');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'latexmuzzle' : SummonLatexMuzzle,
            'latexheels' : SummonLatexHeels,
            'latexmittens' : SummonLatexMittens,
            'latexcorset' : SummonLatexCorset,
        };
        this.actions = {
            'latexhug' : LatexHug,
        };
    }

    getClassName(){
        return "Skunk Warlock";
    }

}

module.exports = SkunkWarlock;