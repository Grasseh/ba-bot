const Status = require('./status');

class StandingStill extends Status{
    constructor(){
        super();
        this.name = "Standing Still";
        this.effect = "+4 to Enemy Hit, +2 to all Escape Rolls";
        this.time = 1;
    }

    display(){
        return ` ${ this.effect } - Duration : ${ this.time } turn`;
    }

    cooldown(){
        this.time--;
        return this.time <= 0;
    }

    toEnemyHit(){
        return 4;
    }

    toEscape(){
        return 2;
    }
}

module.exports = StandingStill;