const Restraint = require('../restraint');
const Encumbered = require('../../status/encumbered');
const Hobbled = require('../../status/hobbled');
const Incapacitated = require('../../status/incapacitated');

class LatexHeel extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Legs';
        this.name = 'Latex Heels';
        this.command = 'latexheels';
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
            Easy : 'Ankle-high short heels -- No Effect',
            Medium : 'Knee-high high-heeled boots -- Encumbered',
            Hard : 'Thigh-high paw-shaped ballet boots keep the wearer unsteadily on their toes -- Hobbled',
            Extreme : 'Legs are frogtied and folded against the butt, leaving the wearer to crawl around on their knees -- Incapacitated',
            Impossible : 'Legs are frogtied and folded against the butt, leaving the wearer to crawl around on their knees -- Incapacitated',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexHeel;