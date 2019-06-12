const Spell = require('../spell');
const embedUtils = require('../../../utils/embeds');
const stateFactory = require('../../../duelstates/stateFactory');

class RubberBall extends Spell{
    constructor(){
        super();
        this.melee = true;
        this.name = "Rubber Ball";
    }

    cast({enemy, effectRoll, crit, duel, msg, dice}){
        let effectTable = [1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5];
        let difficulty = effectTable[effectRoll - 1];
        if(crit)
            difficulty += 1;
        if(difficulty > 5)
            difficulty = 5;
        return this.activate(enemy, duel, msg, difficulty, dice);
    }

    activate(enemy, duel, msg, hitCount, dice){
        let embed = null;
        stateFactory.createState('rubberBallChoice', duel, dice);
        duel.state.prepare(hitCount, enemy);
        duel.state.run(msg, false);
        return {embed, changedState : true};
    }
}

module.exports = RubberBall;