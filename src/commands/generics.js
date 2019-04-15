const state = require('../state');
const Discord = require('discord.js');
const Duel = require('../entities/duel');

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
    status: (args, msg, duel) => {
        return currentDuel.displayStatus(msg);
    },
    duel: (args, msg, duel, dice) => {
        if (state.getState().getCurrentDuel(msg.author.id)) {
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Error!', state.getState().bot.user.displayAvatarURL)
                .setColor(0xAA0000)
                .setDescription('You are already in a duel! Check your current duel status with `!status`! ')
            msg.channel.send(embed);
            return;
        }
        state.getState().duels.push(new Duel(`<@${msg.author.id}>`, args[0], dice)); 
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
            .setDescription(`${args[0]}, you have been challenged to a Bondage Arena duel! Write \`!accept\` to accept or \`!cancel\` to decline.`)
        msg.channel.send(embed);
        return;
    },
    accept: (args, msg, currentDuel) => {
        return currentDuel.accept(msg);
    },
    cancel: (args, msg, currentDuel) => {
        return currentDuel.cancel(msg);
    }
}

module.exports = generics;