const playerClass = require('./playerClass');
const RubberBall = require('./spells/skunk/summonLatexCorset');

class RubberMage extends playerClass{
    constructor(){
        super();
        this.actions = {
            'rubberball' : new RubberBall(),
        };
    }

    getClassName(){
        return "RubberMage";
    }

}

module.exports = RubberMage;