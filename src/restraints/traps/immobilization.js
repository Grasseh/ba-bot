const Restraint = require('../restraint');
const Immobilized = require('../../status/immobilized');
const Encumbered = require('../../status/encumbered');
const Hobbled = require('../../status/hobbled');
const Incapacitated = require('../../status/incapacitated');

class ImmobilizationTrap extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Legs';
        this.name = 'Immobilization Trap';
        this.command = 'immobilizationtrap';
        this.statusTable = [
            [Immobilized],
            [Immobilized, Encumbered],
            [Immobilized, Hobbled],
            [Immobilized, Incapacitated],
            [Immobilized, Incapacitated]
        ];
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : 'Buckled leather cuffs bind your ankles to the floor -- Immobilized',
            Medium : 'Metal leg irons shackle your ankles to a ring on the floor -- Immobilized & Encumbered ',
            Hard : 'Metal cuffs on a spreader bar are bolted to the floor, holding your legs akimbo -- Immobilized & Hobbled',
            Extreme : 'A metal frame bolted to the floor locks around your ankles, knees, thighs, and waist, holding you fast -- Immobilized && Incapacitated',
            Impossible : 'A metal frame bolted to the floor locks around your ankles, knees, thighs, and waist, holding you fast -- Immobilized && Incapacitated',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = ImmobilizationTrap;