const Status = require('./status');

class TrapAttackAvailable extends Status{
    constructor(){
        super();
        this.name = "Trap Attack Available";
        this.effect = "Can use a trap attack this turn";
        this.time = 1;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    cooldownOther(){
        this.time--;
        return this.time <= 0;
    }

    isTrapAttackAvailable(){
        return true;
    }
}

module.exports = TrapAttackAvailable;