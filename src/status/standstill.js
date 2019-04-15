const Status = require('./status');

class StandingStill extends Status{
    constructor(){
        super();
        this.name = "Standing Still";
        this.effect = "+4 to Enemy Hit";
        this.time = 1;
    }

    display(){
        return `${ this.name } - ${ this.effect } - Duration : ${ this.time } turn \n`;
    }

    cooldown(){
        this.time--;
        return this.time <= 0;
    }
}

module.exports = StandingStill;