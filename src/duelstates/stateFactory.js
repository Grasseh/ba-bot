//Needs a file factory because node does not like circular requires

class FileFactory{
    createState(state, duel, dice){
        let states = {
            'action' : ActionState,
            'startTurn' : StartTurnState,
            'waiting' : WaitingState,
            'initiative' : InitiativeState
        }

        let toCreate = states[state];
        duel.state = new toCreate(duel, dice);
    }

}

module.exports = new FileFactory();

//Requires gotta be after to avoid circular issues
const ActionState = require('./actionState');
const StartTurnState = require('./startTurnState');
const WaitingState = require('./waitingstate');
const InitiativeState = require('./initiativestate');