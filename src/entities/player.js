const StandingStill = require('../status/standstill');

class Player{
    constructor(name){
        this.name = name;
        this.class = "Skunk Warlock";
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
    
    stand(){
        this.effects.push(new StandingStill());
    }
}

module.exports = Player;