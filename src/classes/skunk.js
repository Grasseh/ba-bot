const playerClass = require('./playerClass');
const LatexMuzzle = require('../restraints/latexMuzzle');
const LatexHeel = require('../restraints/latexHeel');
const Blinded = require('../status/blinded');
const Gagged = require('../status/gagged');
const Hooded = require('../status/hooded');
const Encumbered = require('../status/encumbered');
const Hobbled = require('../status/hobbled');
const Incapacitated = require('../status/incapacitated');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'muzzle' : this.muzzle.bind(this),
            'heels' : this.heels.bind(this),
        }
    }

    getClassName(){
        return "Skunk Warlock";
    }

    castSpell(spellName, effectRoll, self, enemy, crit = false){
        return this.spells[spellName](effectRoll, self, enemy, crit);
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

    getSpellList(){
        return Object.keys(this.spells);
    }
}

module.exports = SkunkWarlock;