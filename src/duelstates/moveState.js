const state = require('../state');
const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const FullyEvaded = require('../status/fullyEvaded');
const TrapAttackAvailable = require('../status/trapAttackAvailable');
const CriticalTrap = require('../status/criticalTrap');
const embedUtils = require('../utils/embeds');

class MoveState extends DuelState{
    getValidActions(){
        return ['status', 'cancel'];
    }

    nextState(action, msg, args){
        if(action === 'action'){
            stateFactory.createState('action', this.duel, this.dice);
            this.duel.state.run(msg);
            return;
        }
        if(action === 'trap'){
            stateFactory.createState('hitTrap', this.duel, this.dice);
            this.duel.state.run(msg);
            return;
        }
        stateFactory.createState('startTurn', this.duel, this.dice);
        this.duel.state.run(msg);
        return;
    }

    run(msg) {
        //Roll for trap
        let diceRoll = this.dice.d20();
        let totalRoll = diceRoll.sum;
        let player = this.duel.getCurrentPlayer();
        let crit = totalRoll === 20;
        let critFail = totalRoll === 1;
        let additionals = [];
        //Add Player hit effects
        for (let effect of player.effects) {
            let toTraps = effect.toTraps();
            if (toTraps !== 0) {
                additionals.push({ name: effect.name, value: toTraps });
                totalRoll += toTraps;
            }
        }
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Trap roll for ${player.name}!`)
            .addField('d20', `${diceRoll.sum}`);
        for(let additional of additionals){
            embed.addField(additional.name, additional.value);
        }
        embed.addField('total', `${totalRoll}`);
        if(crit){
            embed.addField('CRITICAL HIT!', 'Fully evaded: +4 to hit if attacking, -4 to enemy hit if not attacking this round');
            player.addEffect(new FullyEvaded(player));
        }
        if(critFail){
            embed.addField('CRITICAL FAIL!', '+1 To trap effect tier!');
            player.addEffect(new CriticalTrap());
        }
        if (totalRoll <= 4 || critFail) {
            msg.channel.send(embed);
            this.nextState('trap', msg);
            return;
        }
        if(totalRoll <= 14){
            embed.addField('No traps!', 'No trap seen!\n');
            msg.channel.send(embed);
            this.nextState('action', msg);
            return;
        }
        embed.addField('Trap avoided and spotted!', 'Trap attack enabled this turn!');
        player.addEffect(new TrapAttackAvailable());
        msg.channel.send(embed);
        this.nextState('action', msg);
        return;
    }

}

module.exports = MoveState;