const Status = require('./status');

class Bound extends Status{
    constructor(binding){
        super();
        this.name = "Bound";
        this.effect = "-2 Non-Spell Hit";
        this.time = 0;
        this.binding = binding;
    }

    toNonSpellHit(){
        return -2;
    }

}

module.exports = Bound;