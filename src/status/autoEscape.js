const Status = require('./status');

class AutoEscape extends Status{
    constructor(binding, bindingName){
        super();
        this.name = 'Auto Escape';
        this.effect = `On next turn, can escape ${bindingName} if they were not tightened.`;
        this.time = 2;
        this.binding = binding;
    }

    cooldownOther(_a, _b){
        this.time--;
        return this.time <= 0;
    }
}

module.exports = AutoEscape;