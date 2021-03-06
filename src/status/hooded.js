const Status = require('./status');

class Hooded extends Status{
    constructor(binding){
        super();
        this.name = "Hooded";
        this.effect = "-3 Traps, -3 Hit, +5 Enemy Hit, -30 to Spell Attacks";
        this.time = 0;
        this.binding = binding;
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

    toSpellHit() {
        return -30;
    }
}

module.exports = Hooded;