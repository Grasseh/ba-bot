const Status = require('./status');

class Breathless extends Status{
    constructor(binding){
        super();
        this.name = 'Breathless';
        this.effect = '+3 Enemy Hit';
        this.time = 0;
        this.binding = binding;
    }

    toEnemyHit(){
        return 3;
    }

}

module.exports = Breathless;