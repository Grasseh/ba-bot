const Status = require('./status');

class ChastityMedium extends Status{
    constructor(binding){
        super();
        this.name = 'Chaste -- Medium';
        this.effect = '-2 Traps';
        this.time = 0;
        this.binding = binding;
    }

    toTraps(){
        return -2;
    }

    isCollared(){
        return true;
    }
}

module.exports = ChastityMedium;