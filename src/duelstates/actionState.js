const state = require('../state');
const DuelState = require('./DuelState');
const stateFactory = require('./stateFactory');
const Discord = require('discord.js');

class ActionState extends DuelState{
    getValidActions(){
        return ['status', 'attack', 'escape'];
    }

    nextState(action, msg, args){
        let valid = false;
        if(action === "attack"){
            valid = this.attack(msg, args);
        }
        if(action === 'escape'){
            valid = this.escape(msg, args);
        }
        if(valid){
            stateFactory.createState('startTurn', this.duel, this.dice);
            this.duel.state.run(msg);
            return;
        }
        let actions = this.duel.getCurrentPlayer().getAllActions().join(', ');
        let escapable = this.duel.getCurrentPlayer().getBoundBodyParts().join(', ');
        if(escapable === ''){
            escapable = 'none';
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Invalid command or bodypart! ${this.duel.getCurrentPlayer().name}'s turn.`)
            .addField(`Actions available:`, `Attack with !attack <command> or Escape a binding with !escape <bodypart>`)
            .addField(`Attacks available:`, `${actions}`)
            .addField(`Bound bodyparts:`, `${escapable}`);
        msg.channel.send(embed);
    }

    run(msg){
        let spells = this.duel.getCurrentPlayer().getAllActions().join(', ');
        let escapable = this.duel.getCurrentPlayer().getBoundBodyParts().join(', ');
        if(escapable === ''){
            escapable = 'none';
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`${this.duel.getCurrentPlayer().name}'s Action Phase!`)
            .addField(`Actions available:`, `Attack with !attack <command> or Escape a binding with !escape <bodypart>`)
            .addField(`Attacks available:`, `${spells}`)
            .addField(`Bound bodyparts:`, `${escapable}`);
        msg.channel.send(embed);
    }

    attack(msg, args){
        //Check if action is valid
        let action = args[0];
        if(!this.duel.getCurrentPlayer().getAllActions().includes(action)){
            return false;
        }

        //Roll for hit
        let diceRoll = this.dice.d20();
        let totalRoll = diceRoll.sum;
        let player = this.duel.getCurrentPlayer();
        let target = this.duel.getOtherPlayer();
        let crit = false;
        let critFail = false;
        let additionals = [];
            //Add Player hit effects
            for(let effect of player.effects){
                let toHit = effect.toHit();
                if(toHit !== 0){
                    additionals.push({ name: effect.name, value: toHit });
                    totalRoll += toHit;
                }
                let toSpellHit = effect.toSpellHit();
                if(toSpellHit !== 0 && player.class.isSpell(action)){
                    additionals.push({ name: effect.name, value: toSpellHit });
                    totalRoll += toSpellHit;
                }
                let toNonSpellHit = effect.toNonSpellHit();
                if(toNonSpellHit !== 0 && player.class.isNonSpell(action)){
                    additionals.push({ name: effect.name, value: toNonSpellHit });
                    totalRoll += toNonSpellHit;
                }
            }
            //Add target hit effects
            for(let effect of target.effects){
                let toEnemyHit = effect.toEnemyHit();
                if(toEnemyHit !== 0){
                    additionals.push({ name: `Enemy ${effect.name}`, value: toEnemyHit });
                    totalRoll += toEnemyHit;
                }
            }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Hit roll for ${player.name} using ${args[0]}!`)
            .addField(`d20`, `${diceRoll.sum}`)
        for(let additional of additionals){
            embed.addField(additional.name, additional.value);
        }
        embed.addField(`total`, `${totalRoll}`);
        if(diceRoll.sum == 20){
            crit = true;
            embed.addField(`CRITICAL HIT!`, `+1 To Effect Tier!`);
        }
        if(diceRoll.sum == 1){
            critFail = true;
            embed.addField(`CRITICAL FAIL!`, `You hit yourself!`);
            target = player;
        }
        msg.channel.send(embed);
        if (!crit && totalRoll < 11 && !critFail) {
            embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`Result for ${player.name} using ${args[0]}!`)
                .addField(`Miss!`, `And the attack fails!`);
            msg.channel.send(embed);
            return true;
        }
        //Roll for effect
        let effectRoll = this.dice.d20();
        totalRoll = effectRoll.sum;
        embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Effect roll for ${player.name} using ${args[0]}!`)
            .addField(`d20`, `${effectRoll.sum}`)
            .addField(`total`, `${totalRoll}`);
        msg.channel.send(embed);

        //Apply effect
        embed = player.class.doAction(action, totalRoll, player, target, crit);
        msg.channel.send(embed);
        return true;
    }

    escape(msg){
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`${this.duel.playerstates[this.duel.turnPlayer].name}'s is escaping a binding!`)
            .addField(`Woops:`, `This action has not been implemented yet...`);
        msg.channel.send(embed);
    }
}

module.exports = ActionState;