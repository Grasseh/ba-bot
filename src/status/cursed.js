const Status = require('./status');
const EscapeClass = require('../services/escape');

class Cursed extends Status{
    constructor(binding){
        super();
        this.name = "Cursed";
        this.effect = `Any failed escape attempt tightens the binding in question!`;
        this.time = 0;
        this.binding = binding;
        this.escapeClass = new EscapeClass();
    }

    onFailedEscape(player, restraint, msg){
        this.escapeClass.increaseDifficulty(restraint, player, msg, 1);
    }
}

module.exports = Cursed;