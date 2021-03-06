const Spell = require('../spell');
const LatexCorset = require('../../../restraints/skunk/latexCorset');

class SummonLatexCorset extends Spell{
    constructor(){
        super();
        this.spell = true;
        this.name = "Latex Corset";
    }

    cast({enemy, effectRoll, crit}){
        let effectTable = this.getGenericEffectTable();
        return {embed : this.applyGenericBinding(enemy, this.name, effectTable, effectRoll, crit, LatexCorset), changedState : false};
    }

}

module.exports = SummonLatexCorset;