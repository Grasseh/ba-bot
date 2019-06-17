const Status = require('./status');

class Clumsy extends Status{
    constructor(binding){
        super();
        this.name = 'Clumsy';
        this.effect = '-1 Traps';
        this.time = 0;
        this.binding = binding;
    }

    toTraps(){
        return -1;
    }

}

module.exports = Clumsy;