const playerClass = require('./playerClass');
const LatexMuzzle = require('../restraints/skunk/latexMuzzle');
const LatexHeel = require('../restraints/skunk/latexHeel');
const LatexMittens = require('../restraints/skunk/latexMittens');
const Blinded = require('../status/blinded');
const Gagged = require('../status/gagged');
const Hooded = require('../status/hooded');
const Encumbered = require('../status/encumbered');
const Hobbled = require('../status/hobbled');
const Incapacitated = require('../status/incapacitated');
const Bound = require('../status/bound');
const Harnessed = require('../status/harnessed');
const Mittened = require('../status/mittened');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'muzzle' : this.muzzle.bind(this),
            'heels' : this.heels.bind(this),
            'mittens' : this.mittens.bind(this),
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
        let statusTable = [
            [Gagged],
            [Gagged],
            [Gagged, Blinded],
            [Hooded],
            [Hooded]
        ];
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexMuzzle, statusTable);
    }

    heels(effectRoll, self, enemy, crit){
        let spellName = "Latex Heels";
        let effectTable = this.getGenericEffectTable();
        let statusTable = [
            [],
            [Encumbered],
            [Hobbled],
            [Incapacitated],
            [Incapacitated]
        ];
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexHeel, statusTable);
    }

    mittens(effectRoll, self, enemy, crit){
        let spellName = "Latex Mittens";
        let effectTable = this.getGenericEffectTable();
        let statusTable = [
            [],
            [Bound],
            [Harnessed],
            [Mittened],
            [Mittened]
        ];
        return this.applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, LatexMittens, statusTable);
    }

}

module.exports = SkunkWarlock;