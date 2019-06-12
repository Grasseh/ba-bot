const playerClass = require('./playerClass');
const RubberBall = require('./spells/rubber/rubberBall');
const RubberTouch = require('./spells/rubber/rubberTouch');

class RubberMage extends playerClass{
    constructor(){
        super();
        this.actions = {
            'rubberball' : new RubberBall(),
            'rubbertouch' : new RubberTouch(),
        };
    }

    getClassName(){
        return "RubberMage";
    }

}

module.exports = RubberMage;