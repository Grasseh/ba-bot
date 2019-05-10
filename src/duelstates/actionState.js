const state = require('../state');
const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const EscapeClass = require('../services/escape');
const embedUtils = require('../utils/embeds');
const ImmobilizationTrap = require('../traps/immobilization');
const ChastityTrap = require('../traps/chastity');
const MittensTrap = require('../traps/mittens');

class ActionState extends DuelState{
    getValidActions(){
        return ['status', 'attack', 'escape', 'cancel', 'trapattack'];
    }

    nextState(action, msg, args){
        let valid = false;
        let changedState = false;
        if(action === "attack"){
            ({changedState, valid} = this.attack(msg, args));
        }
        if(action === 'escape'){
            ({changedState, valid} = this.escape(msg, args));
        }
        if(action === 'trapattack'){
            ({changedState, valid} = this.trapattack(msg, args));
        }
        if(valid && !changedState){
            stateFactory.createState('startTurn', this.duel, this.dice);
            this.duel.state.run(msg);
            return;
        }
        if(!changedState){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid command or bodypart! ${this.duel.getCurrentPlayer().name}'s turn.`)
            embed = this.buildCommands(embed);
            msg.channel.send(embed);
        }
    }

    run(msg){
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`${this.duel.getCurrentPlayer().name}'s Action Phase!`);
        embed = this.buildCommands(embed);
        msg.channel.send(embed);
    }

    buildCommands(embed){
        let spells = this.duel.getCurrentPlayer().getAllActions(this.duel).join(', ');
        let escapable = this.duel.getCurrentPlayer().getBoundBodyParts().join(', ');
        let trapAttackEnabled = this.duel.getCurrentPlayer().isTrapAttackEnabled();
        let trapAttackable = this.duel.getOtherPlayer().getUpgradableTraps().join(', ');
        if(escapable === ''){
            escapable = 'none';
        }
        if(trapAttackable === ''){
            trapAttackable = 'none';
        }
        let trapAttackMessage = '';
        if(trapAttackEnabled){
            trapAttackMessage = 'or increase a trap with !trapattack <trap>';
        }
        embed.addField(`Actions available:`, `Attack with !attack <command> or Escape a binding with !escape <bodypart> ${trapAttackMessage}`)
            .addField(`Attacks available:`, `${spells}`)
            .addField(`Bound bodyparts:`, `${escapable}`);
        if(trapAttackEnabled){
            embed.addField(`Upgradable traps:`, trapAttackable);
        }
        return embed;
    }

    attack(msg, args){
        //Check if action is valid
        let action = args[0];
        if(!this.duel.getCurrentPlayer().getAllActions(this.duel).includes(action)){
            return {changedState : false, valid: false };
        }

        //Roll for hit
        let diceRoll = this.dice.d20();
        let totalRoll = diceRoll.sum;
        let player = this.duel.getCurrentPlayer();
        let target = this.duel.getOtherPlayer();
        let crit = totalRoll === 20;
        let critFail = totalRoll === 1;
        let actionInstance = player.class.getAction(action);
        let additionals = [];
        //Add Player hit effects
        //Dupe in case an effect does modifs
        let effects = player.effects;
        for (let effect of effects) {
            let toHit = effect.toHit();
            if (toHit !== 0) {
                additionals.push({ name: effect.name, value: toHit });
                totalRoll += toHit;
            }
            let toSpellHit = effect.toSpellHit();
            if (toSpellHit !== 0 && player.class.isSpell(action)) {
                additionals.push({ name: effect.name, value: toSpellHit });
                totalRoll += toSpellHit;
            }
            let toNonSpellHit = effect.toNonSpellHit();
            if (toNonSpellHit !== 0 && player.class.isNonSpell(action)) {
                additionals.push({ name: effect.name, value: toNonSpellHit });
                totalRoll += toNonSpellHit;
            }
        }
        //Add target hit effects
        for (let effect of target.effects) {
            let toEnemyHit = effect.toEnemyHit();
            if (toEnemyHit !== 0) {
                additionals.push({ name: `Enemy ${effect.name}`, value: toEnemyHit });
                totalRoll += toEnemyHit;
            }
        }
        //Add spell hit effect
        let toActionHit = actionInstance.toHit({target});
        if(toActionHit !== 0){
            additionals.push({ name: `${actionInstance.name}`, value: toActionHit });
            totalRoll += toActionHit;
        }
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Hit roll for ${player.name} using ${args[0]}!`)
            .addField(`d20`, `${diceRoll.sum}`)
        for(let additional of additionals){
            embed.addField(additional.name, additional.value);
        }
        embed.addField(`total`, `${totalRoll}`);
        if(crit){
            embed.addField(`CRITICAL HIT!`, `+1 To Effect Tier!`);
        }
        if(critFail){
            embed.addField(`CRITICAL FAIL!`, `You hit yourself!`);
            target = player;
        }
        msg.channel.send(embed);
        if (!crit && totalRoll < 11 && !critFail) {
            embed = embedUtils.getCombatEmbed()
                .setDescription(`Result for ${player.name} using ${args[0]}!`)
                .addField(`Miss!`, `And the attack fails!`);
            msg.channel.send(embed);
            return {changedState : false, valid: true };
        }
        //Roll for effect
        let effectRoll = this.dice.d20();
        totalRoll = effectRoll.sum;
        embed = embedUtils.getCombatEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Effect roll for ${player.name} using ${args[0]}!`)
            .addField(`d20`, `${effectRoll.sum}`)
            .addField(`total`, `${totalRoll}`);
        msg.channel.send(embed);

        //Apply effect
        let changedState = false;
        actionInstance.used = true;
        ({changedState, embed} = actionInstance.cast({enemy : target, effectRoll : totalRoll, crit, duel : this.duel, msg, dice : this.dice}));
        msg.channel.send(embed);
        return {changedState, valid : true};
    }

    trapattack(msg, args){
        //Check if action is valid
        let action = args[0];
        if(!this.duel.getOtherPlayer().getUpgradableTraps().includes(action)){
            return {changedState : false, valid: false };
        }
        //Roll for hit
        let diceRoll = this.dice.d20();
        let totalRoll = diceRoll.sum;
        let player = this.duel.getCurrentPlayer();
        let target = this.duel.getOtherPlayer();
        let crit = totalRoll === 20;
        let critFail = totalRoll === 1;
        let traps = {
            immobilizationtrap : ImmobilizationTrap,
            chastity : ChastityTrap,
            mittens : MittensTrap
        };
        let trap = new (traps[action])(this.dice);
        let additionals = [];
        //Add Player hit effects
        //Dupe in case an effect does modifs
        let effects = player.effects;
        for (let effect of effects) {
            let toHit = effect.toHit();
            if (toHit !== 0) {
                additionals.push({ name: effect.name, value: toHit });
                totalRoll += toHit;
            }
        }
        //Add target hit effects
        for (let effect of target.effects) {
            let toEnemyHit = effect.toEnemyHit();
            if (toEnemyHit !== 0) {
                additionals.push({ name: `Enemy ${effect.name}`, value: toEnemyHit });
                totalRoll += toEnemyHit;
            }
        }
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Hit roll for ${player.name} using ${action}!`)
            .addField(`d20`, `${diceRoll.sum}`)
        for(let additional of additionals){
            embed.addField(additional.name, additional.value);
        }
        embed.addField(`total`, `${totalRoll}`);
        if(crit){
            embed.addField(`CRITICAL HIT!`, `+1 To Effect Tier!`);
        }
        if(critFail){
            embed.addField(`CRITICAL FAIL!`, `You hit yourself!`);
            target = player;
        }
        msg.channel.send(embed);
        if (!crit && totalRoll < 13 && !critFail) {
            embed = embedUtils.getCombatEmbed()
                .setDescription(`Result for ${player.name} using ${action}!`)
                .addField(`Miss!`, `And the attack fails!`);
            msg.channel.send(embed);
            return {changedState : false, valid: true };
        }
        //Roll for effect
        let effectRoll = this.dice.d20();
        totalRoll = effectRoll.sum;
        embed = embedUtils.getCombatEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Effect roll for ${player.name} using ${action}!`)
            .addField(`d20`, `${effectRoll.sum}`)
            .addField(`total`, `${totalRoll}`);
        msg.channel.send(embed);

        //Apply effect
        let changedState = false;
        trap.activate(effectRoll.sum, target, crit, msg);
        return {changedState, valid : true};

    }

    escape(msg, args){
        let command = args[0].toLowerCase();
        if(!this.duel.getCurrentPlayer().getBoundBodyParts().includes(command)){
            return {valid : false, result : null};
        }
        let restraintToEscape = this.duel.getCurrentPlayer().restraints.filter(r => r.command.toLowerCase() === command);
        if(restraintToEscape.length <= 0){
            return {valid : false, result : null};
        }
        restraintToEscape = restraintToEscape[0];
        let escaping = new EscapeClass();
        let {changedState, valid} = escaping.escape(this.duel.getCurrentPlayer(), restraintToEscape, restraintToEscape.getLocation(), this.dice, msg);
        if(changedState){
            stateFactory.createState('flubbedEscape', this.duel, this.dice)
            this.duel.state.run(msg);
        }
        return {changedState, valid};
    }
}

module.exports = ActionState;