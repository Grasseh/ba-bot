const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const RevengeCollarTrap = require('../traps/revengeCollar');
const TighteningTrap = require('../traps/tightening');
const ImmobilizationTrap = require('../traps/immobilization');
const DissolvingTrap = require('../traps/dissolving');
const ChastityTrap = require('../traps/chastity');

class HitTrapState extends DuelState{
    getValidActions(){
        return ['status', 'cancel'];
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
            RevengeCollarTrap, //1
            TighteningTrap, //3
            ChastityTrap, //6
            ImmobilizationTrap, //11
            DissolvingTrap, //18
        ];
        let diceRoll = this.dice.xDy(1, 5);
        let player = this.duel.getCurrentPlayer();
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Trap roll for ${player.name}!`)
            .addField(`d6`, `${diceRoll.sum}`)
        msg.channel.send(embed);
        let effectRoll = this.dice.d20();
        embed = embedUtils.getCombatEmbed()
            .setDescription(`Effect roll for ${player.name}'s trap!`)
            .addField(`d20`, `${effectRoll.sum}`)
        msg.channel.send(embed);
        let trap = new (traps[diceRoll.sum])(this.dice);
        let critFail = player.effects.some(e => e.name === 'Critical Trap');
        let skipTurn = trap.activate(effectRoll.sum, player, critFail, msg);
        if(skipTurn){
            return this.nextState('skip', msg);
        }
        return this.nextState('continue', msg);
    }

}

module.exports = HitTrapState;