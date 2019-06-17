const Status = require('./status');

class RegeneratingLatex extends Status{
    constructor(binding){
        super();
        this.name = 'Regenerating Latex';
        this.effect = 'Passive : Loosened latex bondage heals one tier per two turns, up to original level';
        this.time = 0;
        this.binding = binding;
    }

    cooldown(){
        //TODO!
        return false;
    }

}

module.exports = RegeneratingLatex;