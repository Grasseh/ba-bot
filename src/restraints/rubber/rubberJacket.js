const Restraint = require('../restraint');
const Bound = require('../../status/bound');
const Harnessed = require('../../status/harnessed');
const Mittened = require('../../status/mittened');

class RubberJacket extends Restraint{
    constructor(difficulty, player){
        super(player);
        this.location = 'Arms';
        this.name = 'Rubber Straitjacket';
        this.command = 'rubberstraitjacket';
        this.setDifficulty(difficulty);
        this.statusTable = [
            [],
            [Bound],
            [Harnessed],
            [Mittened],
            [Mittened]
        ];
    }

    getDescription(){
        let descriptions = {
            Easy : 'A ball of rubber sticks on the chest -- No Effect',
            Medium : 'The rubber reaches towards the shoulders, pinning the upper arm to the sides -- Bound',
            Hard : 'Arms are wrapped in rubber, forced under the chest. -- Harnessed',
            Extreme : 'A complete rubber straitjacket covers the upperbody, forcing the hands into fists under layers of shiny darkness. -- Mittened',
            Impossible : 'A complete rubber straitjacket covers the upperbody, forcing the hands into fists under layers of shiny darkness. -- Mittened',
        };
        return descriptions[this.getDifficulty()];
    }
}

module.exports = RubberJacket;