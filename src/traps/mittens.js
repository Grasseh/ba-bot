let Spell = require('../classes/spells/spell');
let Mittens = require('../restraints/traps/mittens');
let Trap = require('./trap');

class MittensTrap extends Trap{
    activate(effectRoll, player, critFail, msg){
        let genericSpell = new Spell();
        let restraintName = 'Mittens';
        let effectTable = genericSpell.getGenericEffectTable();
        let embed = genericSpell.applyGenericBinding(player, restraintName, effectTable, effectRoll, critFail, Mittens);
        msg.channel.send(embed);
        return effectRoll > 10;
    }
}

module.exports = MittensTrap;