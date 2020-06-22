const Restraint = require('../restraint');
const MittenedTrap = require('../../status/mittenedTrap');

class Mittens extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Arms';
        this.name = 'Mittens';
        this.command = 'mittens';
        this.statusTable = [
            [MittenedTrap],
            [MittenedTrap],
            [MittenedTrap],
            [MittenedTrap],
            [MittenedTrap],
        ];
        this.setDifficulty(difficulty);
    }

    getDescription(){
        let descriptions = {
            Easy : 'Simple mittens make it impossible to properly grasp a weapon! -- Mittened',
            Medium : 'Tight mittens buckle around your wrists, keeping you from being able to pull them off easily -- Mittened',
            Hard : 'Thick mittens hold your hands in useless fists, buckled tightly about your wrists and elbows to hold themselves in place -- Mittened',
            Extreme : 'These mittens run all the way up your arms to the shoulder, locking at the wrists and upper arm. -- Mittened',
            Impossible : 'These mittens run all the way up your arms to the shoulder, locking at the wrists and upper arm. -- Mittened',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = Mittens;