//Needs a file factory because node does not like circular requires

class FileFactory{
    createState(state, duel, dice){
        const ActionState = require('./actionState');
        const StartTurnState = require('./startTurnState');
        const WaitingState = require('./waitingstate');
        const InitiativeState = require('./initiativestate');
        const FlubbedEscapeState = require('./flubbedEscapeState');
        let states = {
            'action' : ActionState,
            'startTurn' : StartTurnState,
            'waiting' : WaitingState,
            'flubbedEscape' : FlubbedEscapeState,
            'initiative' : InitiativeState
        }

        let toCreate = states[state];
        duel.state = new toCreate(duel, dice);
    }

}

//Requires gotta be after to avoid circular issues
module.exports = new FileFactory();
