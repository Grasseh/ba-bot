const Restraint = require('../restraint');
const Cursed = require('../../status/cursed');

class RevengeCollar extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Neck';
        this.name = 'Revenge Collar';
        this.command = 'revengecollar';
        this.statusTable = [
            [],
            [],
            [Cursed],
            [Cursed],
            [Cursed]
        ];
        this.setDifficulty(difficulty);
    }

    getDescription(){
        let descriptions = {
            Easy : 'Lucky! This collar seems to have lost its power, rendering it a simple locked latex collar around your neck. Hopefully nothing upgrades it... -- No Effect',
            Medium : 'Lucky! This collar seems to have lost its power, rendering it a simple locked latex collar around your neck. Hopefully nothing upgrades it... -- No Effect',
            Hard : 'You feel the terrible power of this magically locked leather collar upon your throat! -- Cursed',
            Extreme : 'This seamless metal collar clutches your throat coldly, its runes glowing brightly all around -- Cursed',
            Impossible : 'There is no collar, but you feel a terrible curse upon you, the runes glowing around your neck -- Cursed',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = RevengeCollar;