const Status = require('./status');

class Stumbling extends Status{
    constructor(binding){
        super();
        this.name = 'Stumbling';
        this.effect = '-2 Traps';
        this.time = 0;
        this.binding = binding;
    }

    toTraps(){
        return -2;
    }

}

module.exports = Stumbling;