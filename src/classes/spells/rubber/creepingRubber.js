const Spell = require('../spell');
const stateFactory = require('../../../duelstates/stateFactory');

class CreepingRubber extends Spell{
    constructor(){
        super();
        this.spell = true;
        this.name = 'Creeping Rubber';
    }

    cast({enemy, effectRoll, crit, duel, msg, dice}){
        let effectTable = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,4];
        let difficulty = effectTable[effectRoll - 1];
        let closures = [this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateCrit.bind(this),
        ];
        if(crit)
            difficulty += 1;
        if(difficulty > 4)
            difficulty = 4;
        return closures[difficulty-1](enemy, duel, msg, dice);
    }

    // 1-6	Move Down, old binding removed
    // 7-12	Move Up or Down, old bind removed.
    // 13-19	Move Up or Down, old bind becomes Easy
    // 20	Jump to any, old bind becomes Medium
    activateEasy(enemy, duel, msg, dice){
        let embed = null;
        stateFactory.createState('creepingRubberChoice', duel, dice);
        duel.state.prepare("Easy", enemy);
        duel.state.run(msg, false);
        return {embed, changedState : true};
    }
}

module.exports = CreepingRubber;