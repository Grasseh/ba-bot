const Restraint = require('../restraint');
const Cinched = require('../../status/cinched');
const Constricted = require('../../status/constricted');
const Breathless = require('../../status/breathless');
const Clumsy = require('../../status/clumsy');
const Stumbling = require('../../status/stumbling');
const Dizzy = require('../../status/dizzy');
const Vibrating = require('../../status/vibrating');

class LatexCorset extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Waist';
        this.name = 'Latex Corset';
        this.command = 'latexcorset';
        this.statusTable = [
            [],
            [Clumsy, Cinched],
            [Constricted, Stumbling, Vibrating],
            [Breathless, Dizzy, Vibrating],
            [Breathless, Dizzy, Vibrating],
        ];
        this.difficulty = difficulty;
    }

    getDescription(){
        let descriptions = {
            Easy : 'Simple flexible latex waist cincher -- No Effect',
            Medium : 'Stiffer latex corset tightened with no method of loosening -- Clumsy & Cinched',
            Hard : 'Thicker latex boning and a tightly constricted corset crush down on the victim\'s figure, and vibrating dildos force themselves into the wearer! A small skunk tail sprouts from the target\'s behind -- Constricted, Stumbling & Vibrating',
            Extreme : 'A neck corset joins the tightly bound corset around the waist, pulling the victim\'s figure into a forced hourglass. Additional vibrators over the wearer\'s breasts buzz madly. A large skunk tail bounces from the target\'s behind, each movement reflecting by the vibrators inside -- Breathless, Dizzy & Vibrating',
            Impossible : 'A neck corset joins the tightly bound corset around the waist, pulling the victim\'s figure into a forced hourglass. Additional vibrators over the wearer\'s breasts buzz madly. A large skunk tail bounces from the target\'s behind, each movement reflecting by the vibrators inside -- Breathless, Dizzy & Vibrating',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = LatexCorset;