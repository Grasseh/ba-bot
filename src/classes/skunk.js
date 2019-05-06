const playerClass = require('./playerClass');
const SummonLatexMuzzle = require('./spells/skunk/summonLatexMuzzle');
const SummonLatexHeels = require('./spells/skunk/summonLatexHeels');
const SummonLatexMittens = require('./spells/skunk/summonLatexMittens');
const SummonLatexCorset = require('./spells/skunk/summonLatexCorset');
const LatexHug = require('./spells/skunk/latexHug');
const FullSkunking = require('./spells/skunk/fullSkunking');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.actions = {
            'latexmuzzle' : new SummonLatexMuzzle(),
            'latexheels' : new SummonLatexHeels(),
            'latexmittens' : new SummonLatexMittens(),
            'latexcorset' : new SummonLatexCorset(),
            'latexhug' : new LatexHug(),
            'fullskunking' : new FullSkunking(),
        };
    }

    getClassName(){
        return "Skunk Warlock";
    }

}

module.exports = SkunkWarlock;