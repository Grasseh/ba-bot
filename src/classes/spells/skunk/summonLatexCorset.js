const Spell = require('../spell');
const LatexCorset = require('../../../restraints/skunk/latexCorset');

class SummonLatexCorset extends Spell{
    constructor(){
        super();
        this.melee = false;
        this.spell = true;
        this.ultimate = false;
        this.name = "Latex Corset";
    }

    cast(opts){
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(opts.enemy, this.name, effectTable, opts.effectRoll, opts.crit, LatexCorset);
    }

}

module.exports = SummonLatexCorset;