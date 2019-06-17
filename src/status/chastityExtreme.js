const Status = require('./status');

class ChastityExtreme extends Status{
    constructor(binding, restraint){
        super();
        this.name = 'Chaste -- Extreme';
        this.effect = '-6 Traps, -4 to Hit, -4 to Escape bindings other than the Chastity Belt.';
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

    isCollared(){
        return true;
    }

}

module.exports = ChastityExtreme;