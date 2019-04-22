const StandingStill = require('../status/standstill');
const SkunkWarlock = require('../classes/skunk');

class Player{
    constructor(name){
        this.name = name;
        this.class = new SkunkWarlock();
        this.classCode = "skw";
        this.restraints = [];
        this.effects = [];
    }

    addRestraint(restraint){
    }

    cooldown(){
        for (let effect of this.effects){
            if(effect.cooldown()){
                this.effects = this.effects.filter(eff => eff !== effect);
            }
        }
    }

    getClassName(){
        return this.class.getClassName();
    }
    
    stand(){
        this.effects.push(new StandingStill());
    }

    getSpellList(){
        return this.class.getSpellList();
    }

}

module.exports = Player;