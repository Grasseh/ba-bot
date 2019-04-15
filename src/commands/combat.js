const state = require('../state');
const Discord = require('discord.js');

let combat = {
    stand: (args, msg) => {
        //Check if user is in a duel and it is his turn
        let currentDuel = state.getState().getCurrentDuel(msg.author.id);
        if (!currentDuel) {
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Status!', state.getState().bot.user.displayAvatarURL)
                .setColor(0xffffff)
                .setDescription('You are not currently in a duel!')
            msg.channel.send(embed);
            return;
        }
        if(!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Status!', state.getState().bot.user.displayAvatarURL)
                .setColor(0xffffff)
                .setDescription('It is currently not your turn!')
            msg.channel.send(embed);
            return;
        }
        currentDuel.getCurrentPlayer().move();
        currentDuel.nextPlayer(msg);
    },
    
}

module.exports = combat;