const Status = require('./status');

class CriticalTrap extends Status{
    constructor(binding){
        super();
        this.name = "Critical Trap";
        this.effect = "Hit yourself harder with the trap";
        this.time = 1;
        this.binding = binding;
    }

    display(){
        return ``;
    }

    cooldown(){
        this.time--;
        return this.time <= 0;
    }

    triggersCriticalTrap(){
        return true;
    }

}

module.exports = CriticalTrap;