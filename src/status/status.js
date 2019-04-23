class Status{
    constructor(){
        this.name = "Generic Status";
        this.effect = "Generic Effect";
        this.extra = "";
    }
    
    display(){
        return `${ this.name } - ${ this.effect } - ${ this.extra } \n`;
    }

    cooldown(){

    }

    toHit(){
        return 0;
    }

    toEnemyHit(){
        return 0;
    }
}

module.exports = Status;