const DuelState = require('./DuelState');
const InitiativeState = require('./InitiativeState');

class WaitingState extends DuelState{
    getValidActions(){
        return ['status', 'accept', 'cancel'];
    }

    nextState(action){
        return new InitiativeState(this.duel, this.dice);
    }
}

module.exports = WaitingState;
