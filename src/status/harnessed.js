const Status = require('./status');

class Harnessed extends Status{
    constructor(binding){
        super();
        this.name = "Harnessed";
        this.effect = "-4 Non-Spell Hit. -30 to remove gags harder than 'Easy', -4 to leg escape checks";
        this.time = 0;
        this.binding = binding;
    }

    toNonSpellHit(){
        return -4;
    }

    toEscapeGagsHarderThanEasy(){
        return -30;
    }

    toEscapeLegs(){
        return -4;
    }

}

module.exports = Harnessed;