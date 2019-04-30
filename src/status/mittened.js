const Status = require('./status');

class Mittened extends Status{
    constructor(binding){
        super();
        this.name = "Mittened";
        this.effect = "-30 Non-Spell Hit, -30 to escape gags and legs harder than easy.";
        this.time = 0;
        this.binding = binding;
    }

    toNonSpellHit(){
        return -30;
    }

    toEscapeGagsHarderThanEasy(){
        return -30;
    }

    toEscapeLegsHarderThanEasy(){
        return -30;
    }

}

module.exports = Mittened;