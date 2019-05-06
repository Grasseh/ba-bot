const Spell = require('../spell');
const LatexMittens = require('../../../restraints/skunk/latexMittens');

class SummonLatexMittens extends Spell{
    constructor(){
        super();
        this.melee = false;
        this.spell = true;
        this.ultimate = false;
        this.name = "Latex Mittens";
    }

    cast(opts){
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(opts.enemy, this.name, effectTable, opts.effectRoll, opts.crit, LatexMittens);
    }

}

module.exports = SummonLatexMittens;