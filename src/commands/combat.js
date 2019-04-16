const state = require('../state');
const Discord = require('discord.js');

let combat = {
    stand: (args, msg, currentDuel) => {
        //Check if user is in a duel and it is his turn
        if(!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Status!', state.getState().bot.user.displayAvatarURL)
                .setColor(0xffffff)
                .setDescription('It is currently not your turn!')
            msg.channel.send(embed);
            return;
        }
        currentDuel.getCurrentPlayer().stand();
        currentDuel.state.nextState('stand', msg);
    },
    
}

module.exports = combat;