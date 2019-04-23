const Status = require('./status');

class Hooded extends Status{
    constructor(binding){
        super();
        this.name = "Hooded";
        this.effect = "Gagged, Blinded, and additional +2 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toHit(){
        return -3;
    }

    toEnemyHit(){
        return 5;
    }

    toTraps(){
        return -3;
    }

}

module.exports = Hooded;