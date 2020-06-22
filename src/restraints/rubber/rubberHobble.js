const Restraint = require('../restraint');
const Encumbered = require('../../status/encumbered');
const Hobbled = require('../../status/hobbled');
const Incapacitated = require('../../status/incapacitated');

class RubberHobble extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Legs';
        this.name = 'Rubber Hobble Dress';
        this.command = 'rubberhobbledress';
        this.setDifficulty(difficulty);
        this.statusTable = [
            [],
            [Encumbered],
            [Hobbled],
            [Incapacitated],
            [Incapacitated]
        ];
    }

    getDescription(){
        let descriptions = {
            Easy : 'A short rubber skirt spreads from the waist -- No Effect',
            Medium : 'Knee-long rubber dress, slowing down movement. -- Encumbered',
            Hard : 'Ankle-long rubber hobble dress, forcing both legs to stay within an inch of the other -- Hobbled',
            Extreme : 'High heels form, attaching themselves to the ankle-long rubber dress, making movement almost impossible. -- Incapacitated',
            Impossible : 'High heels form, attaching themselves to the ankle-long rubber dress, making movement almost impossible. -- Incapacitated',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = RubberHobble;