const Spell = require('../spell');
const LatexHeels = require('../../../restraints/skunk/latexHeel');

class SummonLatexHeels extends Spell{
    constructor(){
        super();
        this.melee = false;
        this.spell = true;
        this.ultimate = false;
        this.name = "Latex Heels";
    }

    cast(opts){
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(opts.enemy, this.name, effectTable, opts.effectRoll, opts.crit, LatexHeels);
    }

}

module.exports = SummonLatexHeels;