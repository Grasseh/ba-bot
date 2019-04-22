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
        if(action == "attack"){
            valid = this.attack(msg, args);
        }
        if(valid){
            stateFactory.createState('startTurn', this.duel, this.dice);
            this.duel.state.run(msg);
            return;
        }
        let spells = this.duel.getCurrentPlayer().getSpellList().join();
        let escapable = "Escaping is not implemented yet";
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Invalid command or bodypart! ${this.duel.getCurrentPlayer().name}'s turn.`)
            .addField(`Actions available:`, `Attack with !attack <command> or Escape a binding with !escape <bodypart>`)
            .addField(`Attacks available:`, `${spells}`)
            .addField(`Bound bodyparts:`, `${escapable}`);
        msg.channel.send(embed);
    }

    run(msg){
        let spells = this.duel.getCurrentPlayer().getSpellList().join();
        let escapable = "Escaping is not implemented yet";
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
        let spell = args[0];
        if(!this.duel.getCurrentPlayer().getSpellList().includes(spell)){
            return false;
        }

        //Roll for hit
        let diceRoll = this.dice.d20();
        let totalRoll = diceRoll.sum;
        let player = this.duel.getCurrentPlayer();
            //Add enemy hit effects
            //Remove player avoid effect
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Hit roll for ${player.name} using ${args[0]}!`)
            .addField(`d20`, `${diceRoll.sum}`)
            .addField(`total`, `${totalRoll}`);
        msg.channel.send(embed);
        if (totalRoll < 11) {
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
            .addField(`d20`, `${diceRoll.sum}`)
            .addField(`total`, `${totalRoll}`);
        msg.channel.send(embed);

        //Apply effect

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