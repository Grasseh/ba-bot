const Status = require('./status');

class Mittened extends Status{
    constructor(binding){
        super();
        this.name = 'Mittened';
        this.effect = '-30 Non-Spell Hit, -30 to escape gags and legs harder than easy.';
        this.time = 0;
        this.binding = binding;
    }

    toNonSpellHit(){
        return -30;
    }

    toEscape(restraint){
        if(restraint.location === 'Legs' && restraint.difficulty > 1)
            return -30;
        if(restraint.location === 'Head' && restraint.difficulty > 1)
            return -30;
        return 0;
    }

}

module.exports = Mittened;