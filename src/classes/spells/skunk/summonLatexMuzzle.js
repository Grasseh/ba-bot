const Spell = require('../spell');
const LatexMuzzle = require('../../../restraints/skunk/latexMuzzle');

class SummonLatexMuzzle extends Spell{
    constructor(){
        super();
        this.melee = false;
        this.spell = true;
        this.ultimate = false;
        this.name = "Latex Muzzle";
    }

    cast(opts){
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(opts.enemy, this.name, effectTable, opts.effectRoll, opts.crit, LatexMuzzle);
    }

}

module.exports = SummonLatexMuzzle;