const Status = require('./status');

class CriticalTrap extends Status{
    constructor(binding){
        super();
        this.name = 'Critical Trap';
        this.effect = 'Hit yourself harder with the trap';
        this.time = 1;
        this.binding = binding;
        this.hidden = true;
    }

    display(){
        return '';
    }

    cooldown(_a, _b){
        this.time--;
        return this.time <= 0;
    }

    triggersCriticalTrap(){
        return true;
    }

}

module.exports = CriticalTrap;