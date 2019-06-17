
class playerClass{

    getSpellList(){
        return Object.keys(this.actions).filter(a => this.actions[a].isSpell());
    }

    getNonSpellList(){
        return Object.keys(this.actions).filter(a => !this.actions[a].isSpell());
    }

    getAllActions(duel){
        if(duel.getTurnCount() < 4){
            return Object.keys(this.actions).filter(a => !this.actions[a].isUltimate());
        }
        return Object.keys(this.actions).filter(a => !this.actions[a].isUltimate() || !this.actions[a].used);
    }

    isSpell(action){
        return this.getSpellList().includes(action);
    }

    isNonSpell(action){
        return this.getNonSpellList().includes(action);
    }

    getAction(action){
        return this.actions[action];
    }

    addPassives(){}
}

module.exports = playerClass;