const Status = require('./status');

class Gagged extends Status{
    constructor(binding){
        super();
        this.name = "Gagged";
        this.effect = "-30 to Spell Attacks";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toSpellHit(){
        return -30;
    }

}

module.exports = Gagged;