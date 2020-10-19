const playerClass = require('./playerClass');
const RubberBall = require('./spells/rubber/rubberBall');
const RubberTouch = require('./spells/rubber/rubberTouch');
const CreepingRubber = require('./spells/rubber/creepingRubber');

class RubberMage extends playerClass{
    constructor(){
        super();
        this.actions = {
            'rubberball' : new RubberBall(),
            'rubbertouch' : new RubberTouch(),
            'creepingrubber' : new CreepingRubber(),
        };
    }

    getClassName(){
        return 'RubberMage';
    }

}

module.exports = RubberMage;