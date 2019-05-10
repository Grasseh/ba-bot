const Status = require('./status');

class ChastityExtreme extends Status{
    constructor(binding, restraint){
        super();
        this.name = "Chaste -- Extreme";
        this.effect = "-4 Traps, -2 to Hit, -2 to Escape bindings other than the Chastity Belt.";
        this.time = 0;
        this.binding = binding;
        this.restraint = restraint;
    }

    toHit(){
        return -4;
    }

    toTraps(){
        return -6;
    }

    toEscape(restraint){
        if(restraint.id !== this.restraint.id){
            return -4;
        }
        return 0;
    }

}

module.exports = ChastityExtreme;