const Status = require('./status');
const EscapeClass = require('../services/escape');

class Cursed extends Status{
    constructor(binding){
        super();
        this.name = "Cursed";
        this.effect = `Any failed escape attempt to tighten the binding in question!`;
        this.time = 0;
        this.binding = binding;
    }

    display(){
        return `${ this.name } - ${ this.effect } \n`;
    }

    onFailedEscape(player, restraint, msg){
        let escaping = new EscapeClass();
        escaping.increaseDifficulty(restraint, player, msg, 1);
    }
}

module.exports = Cursed;