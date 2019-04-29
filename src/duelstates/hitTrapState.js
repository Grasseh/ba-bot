const DuelState = require('./DuelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const RevengeCollarTrap = require('../traps/revengeCollar');

class HitTrapState extends DuelState{
    getValidActions(){
        return ['status'];
    }

    nextState(action, msg, args){
        if(action === 'skip'){
            stateFactory.createState('startTurn', this.duel, this.dice);
        }
        if(action === 'continue'){
            stateFactory.createState('action', this.duel, this.dice);
        }
        this.duel.state.run(msg);
        return;
    }

    run(msg) {
        //Roll for trap
        let traps = [
            null,
            RevengeCollarTrap
        ];
        let diceRoll = this.dice.xDy(1, 1);
        let player = this.duel.getCurrentPlayer();
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Trap roll for ${player.name}!`)
            .addField(`d1`, `${diceRoll.sum}`)
        msg.channel.send(embed);
        let effectRoll = this.dice.d20();
        embed = embedUtils.getCombatEmbed()
            .setDescription(`Effect roll for ${player.name}'s trap!`)
            .addField(`d20`, `${effectRoll.sum}`)
        msg.channel.send(embed);
        let trap = new (traps[diceRoll.sum])();
        let critFail = player.effects.some(e => e.name === 'Critical Trap');
        let skipTurn = trap.activate(effectRoll.sum, player, critFail, msg);
        if(skipTurn){
            return this.nextState('skip', msg);
        }
        return this.nextState('continue', msg);
    }

}

module.exports = HitTrapState;