const Status = require('./status');

class Blinded extends Status{
    constructor(binding){
        super();
        this.name = "Blinded";
        this.effect = "-3 Traps, -3 Hit, +3 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    toHit(){
        return -3;
    }

    toEnemyHit(){
        return 3;
    }

    toTraps(){
        return -3;
    }

}

module.exports = Blinded;