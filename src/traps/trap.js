class Trap{
    constructor(dice){
        this.dice = this;
    }

    activate(){
        return false; //Doesn't skip turn
    }
}

module.exports = Trap;