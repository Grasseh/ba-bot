const Status = require('./status');

class Bound extends Status{
    constructor(binding){
        super();
        this.name = "Bound";
        this.effect = "-2 Non-Spell Hit";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toNonSpellHit(){
        return -2;
    }

}

module.exports = Bound;