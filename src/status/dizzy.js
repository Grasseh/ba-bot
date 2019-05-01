const Status = require('./status');

class Dizzy extends Status{
    constructor(binding){
        super();
        this.name = "Dizzy";
        this.effect = "-3 Traps";
        this.time = 0;
        this.binding = binding;
    }

    toTraps(){
        return -3;
    }

}

module.exports = Dizzy;