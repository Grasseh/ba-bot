const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');

class WaitingState extends DuelState{
    getValidActions(){
        return ['status', 'accept', 'cancel'];
    }

    nextState(action){
        stateFactory.createState('initiative', this.duel, this.dice);
    }
}

module.exports = WaitingState;
