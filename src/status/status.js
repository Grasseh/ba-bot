class Status{
    constructor(){
        this.name = "Generic Status";
        this.effect = "Generic Effect";
        this.extra = "";
        this.binding = null;
    }
    
    display(){
        return `${ this.name } - ${ this.effect } - ${ this.extra } \n`;
    }

    cooldown(){
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
}

module.exports = Status;