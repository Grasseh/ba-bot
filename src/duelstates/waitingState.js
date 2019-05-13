const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');

class WaitingState extends DuelState{
    getValidActions(){
        return ['status', 'accept', 'cancel'];
    }

    nextState(action){
        stateFactory.createState('classSelect', this.duel, this.dice);
    }
}

module.exports = WaitingState;
