const Status = require('./status');

class Hobbled extends Status{
    constructor(binding){
        super();
        this.name = "Hobbled";
        this.effect = "-2 Traps, +4 Enemy Hit";
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    toEnemyHit(){
        return 4;
    }

    toTraps(){
        return -2;
    }

}

module.exports = Hobbled;