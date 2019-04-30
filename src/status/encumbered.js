const Status = require('./status');

class Encumbered extends Status{
    constructor(binding){
        super();
        this.name = "Encumbered";
        this.effect = "-1 Traps, +2 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    toEnemyHit(){
        return 2;
    }

    toTraps(){
        return -1;
    }

}

module.exports = Encumbered;