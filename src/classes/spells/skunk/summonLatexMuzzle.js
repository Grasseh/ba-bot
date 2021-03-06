const Spell = require('../spell');
const LatexMuzzle = require('../../../restraints/skunk/latexMuzzle');

class SummonLatexMuzzle extends Spell{
    constructor(){
        super();
        this.spell = true;
        this.name = "Latex Muzzle";
    }

    cast({enemy, effectRoll, crit}){
        let effectTable = this.getGenericEffectTable();
        return {embed : this.applyGenericBinding(enemy, this.name, effectTable, effectRoll, crit, LatexMuzzle), changedState : false};
    }

}

module.exports = SummonLatexMuzzle;