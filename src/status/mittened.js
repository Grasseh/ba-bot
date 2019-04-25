const Status = require('./status');

class Mittened extends Status{
    constructor(binding){
        super();
        this.name = "Bound";
        this.effect = "-20 Non-Spell Hit, -20 to escape gags and legs harder than easy.";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toNonSpellHit(){
        return -20;
    }

    toEscapeGagsHarderThanEasy(){
        return -20;
    }

    toEscapeLegsHarderThanEasy(){
        return -20;
    }

}

module.exports = Mittened;