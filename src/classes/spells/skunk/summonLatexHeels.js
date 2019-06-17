const Spell = require('../spell');
const LatexHeels = require('../../../restraints/skunk/latexHeel');

class SummonLatexHeels extends Spell{
    constructor(){
        super();
        this.spell = true;
        this.name = 'Latex Heels';
    }

    cast({enemy, effectRoll, crit}){
        let effectTable = this.getGenericEffectTable();
        return {embed : this.applyGenericBinding(enemy, this.name, effectTable, effectRoll, crit, LatexHeels), changedState : false};
    }

}

module.exports = SummonLatexHeels;