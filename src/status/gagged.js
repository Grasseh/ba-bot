const Status = require('./status');

class Gagged extends Status{
    constructor(binding){
        super();
        this.name = "Gagged";
        this.effect = "Cannot use any spell-type attacks (Not currently implemented)";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

}

module.exports = Gagged;