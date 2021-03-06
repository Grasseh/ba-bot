//Needs a file factory because node does not like circular requires

class FileFactory{
    createState(state, duel, dice){
        const ActionState = require('./actionState');
        const StartTurnState = require('./startTurnState');
        const WaitingState = require('./waitingState');
        const InitiativeState = require('./initiativeState');
        const FlubbedEscapeState = require('./flubbedEscapeState');
        const MoveState = require('./moveState');
        const HitTrapState = require('./hitTrapState');
        const LatexHugChoiceState = require('./latexHugChoiceState');
        const PickBindingLocationState = require('./pickBindingLocation');
        let states = {
            'action' : ActionState,
            'startTurn' : StartTurnState,
            'waiting' : WaitingState,
            'flubbedEscape' : FlubbedEscapeState,
            'initiative' : InitiativeState,
            'move' : MoveState,
            'hitTrap' : HitTrapState,
            'latexHugChoice' : LatexHugChoiceState,
            'pickBindingLocation' : PickBindingLocationState,
        }

        let toCreate = states[state];
        duel.state = new toCreate(duel, dice);
    }

}

//Requires gotta be after to avoid circular issues
module.exports = new FileFactory();
