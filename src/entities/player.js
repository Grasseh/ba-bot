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
        this.restraints.push(restraint);
    }
    
    getRestraints(){
        return this.restraints;
    }

    addEffect(effect){
        this.effects.push(effect);
    }

    cooldown(){
        for (let effect of this.effects){
            if(effect.cooldown()){
                this.effects = this.effects.filter(eff => eff !== effect);
            }
        }
    }

    cooldownOther(){
        for (let effect of this.effects){
            if(effect.cooldownOther()){
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
    
    getNonSpellList(){
        return this.class.getNonSpellList();
    }

    getAllActions(){
        return this.class.getAllActions();
    }

    getBoundBodyParts(){
        return this.restraints.map(r => r.getLocation().toLowerCase());
    }

    getEscapableBodyParts(){
        return this.restraints.filter(r => r.difficulty < 5).map(r => r.getLocation().toLowerCase());
    }

    isFullExtreme(){
        let values = [
            this.restraints.filter(r => r.difficulty >= 4 && r.location == "Legs"),
            this.restraints.filter(r => r.difficulty >= 4 && r.location == "Arms"),
            this.restraints.filter(r => r.difficulty >= 4 && r.location == "Head"),
        ];
        return values.every(x => x.length > 0);
    }

}

module.exports = Player;