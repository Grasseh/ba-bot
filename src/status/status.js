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
}

module.exports = Status;