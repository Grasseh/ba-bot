const Status = require('./status');

class MittenedTrap extends Status{
    constructor(binding, restraint){
        super();
        this.name = 'Mittened';
        this.effect = '-30 Non-Spell Hit, -30 to escape gags and legs harder than easy, -30 to escape arm restraints that aren\'t causing this status.';
        this.time = 0;
        this.binding = binding;
        this.restraint = restraint;
    }

    toNonSpellHit(){
        return -30;
    }

    toEscape(restraint){
        if(restraint.location === 'Legs' && restraint.difficulty > 1)
            return -30;
        if(restraint.location === 'Head' && restraint.difficulty > 1)
            return -30;
        if(restraint.location === 'Arms' && restraint.id !== this.restraint.id)
            return -30;
        return 0;
    }
}

module.exports = MittenedTrap;