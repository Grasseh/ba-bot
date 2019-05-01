const Status = require('./status');

class Cinched extends Status{
    constructor(binding){
        super();
        this.name = "Cinched";
        this.effect = "+1 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    toEnemyHit(){
        return 1;
    }

}

module.exports = Cinched;