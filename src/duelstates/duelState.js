class DuelState{

    constructor(duel, dice){
        this.duel = duel;
        this.dice = dice;
    }

    returnValidActions(){
        return [];
    }

    isValidAction(cmd){
        return this.getValidActions().includes(cmd);
    }

    nextState(action){
        return new DuelState(this.duel, this.dice);
    }
}

module.exports = DuelState;