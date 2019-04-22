const playerClass = require('./playerClass');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'muzzle' : this.muzzle.bind(this),

        }
    }

    getClassName(){
        return "Skunk Warlock";
    }

    /*
    Summon Latex Muzzle
    Form a latex muzzle on your target!

    Type: Spell Target: Head

    Roll	Effect Level	Statuses	     Description
    1-6     Easy            Gagged           Latex ball fills the mouth.
    7-12    Medium	        Gagged	         Latex spreads to form a half-mask over the ballgag.
    13-19   Hard	        Gagged  Blinded	 The latex becomes a full-face mask with a cute snout.
    20      Extreme	        Hooded	         Latex spreads over the whole head in a hood, forming a skunk muzzle.
    */
    muzzle(){
    }

    getSpellList(){
        return Object.keys(this.spells);
    }
}

module.exports = SkunkWarlock;