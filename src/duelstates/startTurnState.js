const state = require('../state');
const DuelState = require('./DuelState');
const Discord = require('discord.js');
const stateFactory = require('./stateFactory');

class StartTurnState extends DuelState{
    getValidActions(){
        return ['status', 'stand'];
    }

    nextState(action, msg){
        if (action == 'stand')
            stateFactory.createState('action', this.duel, this.dice)
        this.duel.state.run(msg);
    }

    run(msg){
        this.duel.turnPlayer = (this.duel.turnPlayer + 1) % this.duel.playerstates.length;
        this.duel.getCurrentPlayer().cooldown();
        this.duel.getOtherPlayer().cooldownOther();
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Beginning of ${this.duel.playerstates[this.duel.turnPlayer].name}'s turn!`)
            .addField(`Actions available:`, `Stand Still with !stand or Move with NOTIMPLEMENTED`);
        msg.channel.send(embed);
    }
}

module.exports = StartTurnState;
