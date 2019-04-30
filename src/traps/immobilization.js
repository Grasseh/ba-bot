let PlayerClass = require('../classes/playerClass');
let Immobilization = require('../restraints/traps/immobilization');
let Trap = require('./trap');

class ImmobilizationTrap extends Trap{
    //Cannot be selected in "select a trap"
    //Cannot be Trap Attacked
    activate(effectRoll, player, critFail, msg){
        let genericClass = new PlayerClass();
        let restraintName = 'Immobilization Trap';
        let effectTable = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,4];
        let embed = genericClass.applyGenericBinding(player, restraintName, effectTable, effectRoll, critFail, Immobilization);
        msg.channel.send(embed);
        return effectRoll > 10;
    }
}

module.exports = ImmobilizationTrap;