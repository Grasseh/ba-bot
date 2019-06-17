const Status = require('./status');

class ChastityHard extends Status{
    constructor(binding, restraint){
        super();
        this.name = 'Chaste -- Hard';
        this.effect = '-4 Traps, -2 to Hit, -2 to Escape bindings other than the Chastity Belt.';
        this.time = 0;
        this.binding = binding;
        this.restraint = restraint;
    }

    toHit(){
        return -2;
    }

    toTraps(){
        return -4;
    }

    toEscape(restraint){
        if(restraint.id !== this.restraint.id){
            return -2;
        }
        return 0;
    }

    isCollared(){
        return true;
    }
}

module.exports = ChastityHard;