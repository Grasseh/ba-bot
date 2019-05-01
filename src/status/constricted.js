const Status = require('./status');

class Constricted extends Status{
    constructor(binding){
        super();
        this.name = "Constricted";
        this.effect = "+2 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    toEnemyHit(){
        return 2;
    }

}

module.exports = Constricted;