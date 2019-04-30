const Status = require('./status');

class FullyEvaded extends Status{
    constructor(player){
        super();
        this.name = "Fully Evaded Trap";
        this.effect = "+4 to hit if attacking, -4 to enemy hit if not attacking this round;";
        this.time = 1;
        this.player = player;
    }

    display(){
        return `${ this.effect } - Duration : ${ this.time } turn`;
    }

    cooldown(){
        this.time--;
        return this.time <= 0;
    }

    toHit(){
        this.player.effects = this.player.effects.filter(e => e.name !== this.name);
        return 4;
    }

    toEnemyHit(){
        return -4;
    }
}

module.exports = FullyEvaded;