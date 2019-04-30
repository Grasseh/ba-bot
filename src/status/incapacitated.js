const Status = require('./status');

class Incapacitated extends Status{
    constructor(binding){
        super();
        this.name = "Incapacitated";
        this.effect = "-3 Traps, +6 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    toEnemyHit(){
        return 6;
    }

    toTraps(){
        return -3;
    }

}

module.exports = Incapacitated;