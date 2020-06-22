const Restraint = require('../restraint');
const Vibrating = require('../../status/vibrating');
const ChastityMedium = require('../../status/chastityMedium');
const ChastityHard = require('../../status/chastityHard');
const ChastityExtreme = require('../../status/chastityExtreme');

class ChastityBelt extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Privates';
        this.name = 'Chastity';
        this.command = 'chastity';
        this.statusTable = [
            [],
            [Vibrating, ChastityMedium],
            [Vibrating, ChastityHard],
            [Vibrating, ChastityExtreme],
            [Vibrating, ChastityExtreme],
        ];
        this.setDifficulty(difficulty);
    }

    getDescription(){
        let descriptions = {
            Easy : 'A nice buckled leather chastity belt slides around your hips -- No effect',
            Medium : 'A metal-cuffed chastity belt locks tightly around your waist. A dull buzzing coming from the belt betrays the vibrators locked inside... The key is probably on the ground nearby -- Vibrating & Traps -2 ',
            Hard : 'This chastity belt has buzzing intruders sunk into you, providing a thorough distraction for you trying to focus on combat -- Hit -2, Escape -2, Traps -4 & Vibrating',
            Extreme : 'This chastity device\'s intruders are upgraded, and joined by a metal bra vibrator harness, tight metal thigh cuffs and a collar -- Hit -4, Traps -6, Escape -4 & Vibrating',
            Impossible : 'This chastity device\'s intruders are upgraded, and joined by a metal bra vibrator harness, tight metal thigh cuffs and a collar -- Hit -4, Traps -6, Escape -4 & Vibrating',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = ChastityBelt;