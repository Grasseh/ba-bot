const state = require('./state');
const Discord = require('discord.js');

let generics = {
    help: (args, msg) => {
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Help!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xffffff)
            .setDescription('List of basic commands')
            .addField('`!help`', 'Displays this message')
            .addField('`!status`', 'Displays the status of your current fight.')
            .addField('`!duel <@DiscordUserName>`', 'Challenge a user to a duel.')
            .addField('`!accept`', 'Accept an incoming duel.')
            .addField('`!cancel`', 'Cancel an incoming duel.')
        msg.channel.send(embed);
        return;
    },
    status: (args, msg) => {
        //Check if user is in a duel
        let currentDuel = state.getState().duels.filter(duel => {
            return duel.players.every(player => player != `<@${msg.user.id}>`);
        })[0];
        if(currentDuel){
            return currentDuel.displayStatus(msg);
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xffffff)
            .setDescription('You are not currently in a duel!')
        msg.channel.send(embed);
        return;
    },
    duel: (args) => {
    },
    accept: (args) => {

    },
    cancel : (args) => {

    }
}

module.exports = generics;