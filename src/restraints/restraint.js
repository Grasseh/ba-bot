const crypto = require("crypto");

class Restraint{
    constructor(player){
        this.name = "Generic Restraint";
        this.difficulty = 1;
        this.player = player;
        this.description = "Generic Restraint, effect : none";
        this.location = "Toe";
        this.command = "genericrestraint";
        this.id = crypto.randomBytes(32).toString("hex");
        this.statusTable = [
            [],
            [],
            [],
            [],
            []
        ];
    }   

    getDifficulty(){
        let difficulties = [
            "Easy",
            "Medium",
            "Hard",
            "Extreme",
            "Impossible"
        ];
        return difficulties[this.difficulty - 1];
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getLocation(){
        return this.location;
    }

    getCommand(){
        return this.command;
    }
}

module.exports = Restraint;