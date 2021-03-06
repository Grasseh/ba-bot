class Status{
    constructor(){
        this.name = "Generic Status";
        this.effect = "Generic Effect";
        this.extra = "";
        this.binding = null;
        this.hidden = false;
    }
    
    display(){
        return `${ this.effect }`;
    }

    getName(){
        return this.name;
    }

    cooldown(){
        return false;
    }

    cooldownOther(){
        return false;
    }

    toHit(){
        return 0;
    }

    toEnemyHit(){
        return 0;
    }

    toTraps(){
        return 0;
    }

    toSpellHit(){
        return 0;
    }

    toNonSpellHit(){
        return 0;
    }

    toEscape(){
        return 0;
    }

    toEscapeGagsHarderThanEasy(){
        return 0;
    }

    toEscapeLegs(){
        return 0;
    }

    toEscapeLegsHarderThanEasy(){
        return 0;
    }

    triggersCriticalTrap(){
        return false;
    }

    isTrapAttackAvailable(){
        return false;
    }

    onFailedEscape(player, restraint, msg){
    }

    canStand(){
        return true;
    }

    canMove(){
        return true;
    }
}

module.exports = Status;