const state = require('../state');
const DuelState = require('./DuelState');
const StartTurnState = require('./StartTurnState');
const Discord = require('discord.js');

class InitiativeState extends DuelState{
    getValidActions(){
        return ['status'];
    }

    nextState(){
        return new StartTurnState(this.duel, this.dice);
    }

    run(msg){
        let highest = 0;
        let highestId = -2;
        let i = -1;
        let tied = true;
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Duel has begun! Rolls for initiative!`);
        msg.channel.send(embed);
        while(tied){
            highest = 0;
            i = -1;
            for (let player of this.duel.playerstates) {
                let roll = this.dice.d20();
                let embed = new Discord.RichEmbed()
                    .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                    .setColor(0x0000AA)
                    .setDescription(`Initiative roll for ${player.name}!`)
                    .addField(`d20`, `${roll.sum}`);
                msg.channel.send(embed);
                if (roll.sum === highest) {
                    tied = true;
                }
                if (roll.sum > highest) {
                    highest = roll.sum;
                    highestId = i;
                    tied = false;
                }
                i++;
            }
        }
        this.duel.turnPlayer = highestId;
        this.duel.state = new StartTurnState(this.duel, this.dice);
        this.duel.state.run(msg);
    }
}

module.exports = InitiativeState;