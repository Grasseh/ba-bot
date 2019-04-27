const Discord = require('discord.js');
const state = require('../state');

class embedUtils{
    getCombatEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA);
    }

    getPlayerErrorEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Error!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xFF0000);
    }
    
    getBotInfoEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Info!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xFFFFFF);
    }

    getPlayerActionEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00);
    }

    getStatusEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x3F259D);
    }

    getEndOfGameEmbed(){
        return new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x00AA00);
    }
}

module.exports = new embedUtils();