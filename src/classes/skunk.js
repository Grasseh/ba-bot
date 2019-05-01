const playerClass = require('./playerClass');
const LatexMuzzle = require('../restraints/skunk/latexMuzzle');
const LatexHeel = require('../restraints/skunk/latexHeel');
const LatexMittens = require('../restraints/skunk/latexMittens');
const LatexCorset = require('../restraints/skunk/latexCorset');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'latexmuzzle' : this.muzzle.bind(this),
            'latexheels' : this.heels.bind(this),
            'latexmittens' : this.mittens.bind(this),
            'latexcorset' : this.corset.bind(this),
        };
        this.actions = {
        };
    }

    getClassName(){
        return "Skunk Warlock";
    }

    doAction(action, effectRoll, self, enemy, crit = false){
        if(this.isSpell(action))
            return this.spells[action](effectRoll, self, enemy, crit);
        if(this.isNonSpell(action))
            return this.actions[action](effectRoll, self, enemy, crit);
    }

    /*
    Summon Latex Muzzle
    Form a latex muzzle on your target!
    Type: Spell Target: Head
    */
    muzzle(effectRoll, self, enemy, crit){
        let spellName = "Latex Muzzle";
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexMuzzle);
    }

    heels(effectRoll, self, enemy, crit){
        let spellName = "Latex Heels";
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexHeel);
    }

    mittens(effectRoll, self, enemy, crit){
        let spellName = "Latex Mittens";
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexMittens);
    }

    corset(effectRoll, self, enemy, crit){
        let spellName = "Latex Corset";
        let effectTable = this.getGenericEffectTable();
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexCorset);
    }

}

module.exports = SkunkWarlock;