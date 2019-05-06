const Spell = require('../spell');
const LatexMittens = require('../../../restraints/skunk/latexMittens');

class SummonLatexMittens extends Spell{
    constructor(){
        super();
        this.spell = true;
        this.name = "Latex Mittens";
    }

    cast({enemy, effectRoll, crit}){
        let effectTable = this.getGenericEffectTable();
        return {embed : this.applyGenericBinding(enemy, this.name, effectTable, effectRoll, crit, LatexMittens), changedState : false};
    }

}

module.exports = SummonLatexMittens;