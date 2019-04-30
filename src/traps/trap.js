class Trap{
    constructor(dice){
        this.dice = dice;
    }

    activate(){
        return false; //Doesn't skip turn
    }
}

module.exports = Trap;