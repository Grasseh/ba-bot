const Status = require('./status');

/* Cannot 'stand still'. If also Immobilized, -2 on all Escape rolls */
class Vibrating extends Status{
    constructor(binding, restraint){
        super();
        this.restraint = restraint;
        this.name = "Vibrating";
        this.effect = "Cannot 'stand still'. If also Immobilized, -2 on all Escape rolls.";
        this.time = 0;
        this.binding = binding; //ID
    }

    canStand(){
        return false;
    }

    toEscape(){
        let immobilized = this.restraint.player.effects.some(e => !e.canMove());
        if(immobilized)
            return -2;
        return 0;
    }
}

module.exports = Vibrating;