const Status = require('./status');

class Gagged extends Status{
    constructor(binding){
        super();
        this.name = "Gagged";
        this.effect = "-20 to Spell Attacks";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toSpellHit(){
        return -20;
    }

}

module.exports = Gagged;