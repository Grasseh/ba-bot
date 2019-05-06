
class playerClass{

    getSpellList(){
        return Object.keys(this.spells);
    }

    getNonSpellList(){
        return Object.keys(this.actions);
    }

    getAllActions(){
        return this.getSpellList().concat(this.getNonSpellList());
    }

    isSpell(action){
        return this.getSpellList().includes(action);
    }

    isNonSpell(action){
        return this.getNonSpellList().includes(action);
    }

    getAction(action){
        let actionClass = null;
        if(this.isSpell(action))
            actionClass = this.spells[action];
        if(this.isNonSpell(action))
            actionClass = this.actions[action];
        return new actionClass();
    }
}

module.exports = playerClass;