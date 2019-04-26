const state = require('../state');
const DuelState = require('./DuelState');
const Discord = require('discord.js');
const stateFactory = require('./stateFactory');
const EscapeClass = require('../services/escape');

class FlubbedEscapeState extends DuelState{
    getValidActions(){
        return ['status', 'increase'];
    }

    nextState(action, msg, args){
        if (action == 'increase'){
            position = args[0].toLowerCase();
            let escapable = this.duel.getCurrentPlayer().getEscapableBodyParts();
            if (escapable.includes(position)){
                let restraint = this.duel.getCurrentPlayer().restraints.filter(r => r.location.toLowerCase() === position && r.difficulty < 5);
                let escaping = new EscapeClass();
                escaping.increaseDifficulty(restraint, this.duel.getCurrentPlayer(), msg);
                stateFactory.createState('startTurn', this.duel, this.dice);
                return this.duel.state.run(msg);
            }
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a binding to increase!`)
                .addField(`Actions available:`, `Pick a binding to increase with !increase <bodypart>`)
                .addField(`Bound bodyparts:`, `${escapable}`);
            msg.channel.send(embed);
        }
    }

    run(msg){
        let escapable = this.duel.getCurrentPlayer().getEscapableBodyParts().join(', ');
        if (escapable === '') {
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${this.duel.getCurrentPlayer().name} needs to pick a binding to increase... But no other bodyparts are currently bound!`)
            msg.channel.send(embed);
            stateFactory.createState('startTurn', this.duel, this.dice);
            return this.duel.state.run(msg);
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`${this.duel.getCurrentPlayer().name} needs to pick a binding to increase!`)
            .addField(`Actions available:`, `Pick a binding to increase with !increase <bodypart>`)
            .addField(`Bound bodyparts:`, `${escapable}`);
        msg.channel.send(embed);
    }
}

module.exports = FlubbedEscapeState;
