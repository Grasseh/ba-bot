let Spell = require('../classes/spells/spell');
let RevengeCollar = require('../restraints/traps/revengeCollar');
let Trap = require('./trap');

class RevengeCollarTrap extends Trap{
    //Cannot be selected in "select a trap"
    //Cannot be Trap Attacked
    activate(effectRoll, player, critFail, msg){
        let genericSpell = new Spell();
        let restraintName = 'Revenge Collar';
        let effectTable = [2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5];
        let embed = genericSpell.applyGenericBinding(player, restraintName, effectTable, effectRoll, critFail, RevengeCollar);
        msg.channel.send(embed);
        return effectRoll > 10;
    }
}

module.exports = RevengeCollarTrap;