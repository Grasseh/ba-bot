const Status = require('./status');

class FullyBound extends Status{
    constructor(){
        super();
        this.name = "Fully Bound";
        this.effect = "This player has Extreme bindings on Arms, Legs and Head.";
        this.time = 2;
    }

    display(){
        return `${ this.name } - ${ this.effect } - Time before opponent wins : ${ this.time } turn${this.time !== 1 ? 's' : ''} \n`;
    }

    cooldownOther(){
        this.time--;
        return false;
    }
}

module.exports = FullyBound;