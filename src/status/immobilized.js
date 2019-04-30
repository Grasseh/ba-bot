const Status = require('./status');

/* Must 'stand still', but the penalty to Enemy Hit is only +4. If using a melee attack, can only target someone who melee attacked you in the previous turn. May only 'push' targets with a leash. This overrides Vibrating. */
class Immobilized extends Status{
    constructor(binding){
        super();
        this.name = "Immobilized";
        this.effect = "Must 'stand still'. If using a melee attack, can only target someone who melee attacked you in the previous turn. May only 'push' targets with a leash. This overrides Vibrating.";
        this.time = 0;
        this.binding = binding;
    }

    canMove(){
        return false;
    }
}

module.exports = Immobilized;