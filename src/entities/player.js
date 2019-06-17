class Player{
    constructor(name){
        this.name = name;
        this.class = null;
        this.classCode = '';
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
        if(!this.class){
            return 'No class selected yet';
        }
        return this.class.getClassName();
    }

    getSpellList(){
        return this.class.getSpellList();
    }

    getNonSpellList(){
        return this.class.getNonSpellList();
    }

    getAllActions(duel){
        return this.class.getAllActions(duel);
    }

    getBoundBodyParts(){
        return this.restraints.map(r => r.getCommand().toLowerCase());
    }

    getEscapableBodyParts(){
        return this.restraints.filter(r => r.difficulty < 5).map(r => r.getCommand().toLowerCase());
    }

    isFullExtreme(){
        let values = [
            this.restraints.filter(r => r.difficulty >= 4 && r.location == 'Legs'),
            this.restraints.filter(r => r.difficulty >= 4 && r.location == 'Arms'),
            this.restraints.filter(r => r.difficulty >= 4 && r.location == 'Head'),
        ];
        return values.every(x => x.length > 0);
    }

    canMove(){
        return !this.effects.some(e => !e.canMove());
    }

    canStand(){
        return !this.effects.some(e => !e.canStand());
    }

    isTrapAttackEnabled(){
        return this.effects.some(e => e.isTrapAttackAvailable());
    }

    getUpgradableTraps(){
        return this.restraints.filter(r => ['immobilizationtrap', 'chastity', 'mittens'].includes(r.command) && r.difficulty !== 5).map(r => r.command);
    }
}

module.exports = Player;