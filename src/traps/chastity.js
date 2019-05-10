let Spell = require('../classes/spells/spell');
let ChastityBelt = require('../restraints/traps/chastityBelt');
let Trap = require('./trap');

class ChastityTrap extends Trap{
    //Cannot be selected in "select a trap"
    //Cannot be Trap Attacked
    activate(effectRoll, player, critFail, msg){
        let genericSpell = new Spell();
        let restraintName = 'Chastity';
        let effectTable = genericSpell.getGenericEffectTable();
        let embed = genericSpell.applyGenericBinding(player, restraintName, effectTable, effectRoll, critFail, ChastityBelt);
        msg.channel.send(embed);
        return effectRoll > 10;
    }
}

module.exports = ChastityTrap;