const state = require('../state');
const embedUtils = require('../utils/embeds');
const Duel = require('../entities/duel');

let generics = {
    help: (args, msg) => {
        let embed = embedUtils.getBotInfoEmbed()
            .setDescription('List of basic commands')
            .addField('`!help`', 'Displays this message')
            .addField('`!status`', 'Displays the status of your current fight.')
            .addField('`!duel <@DiscordUserName>`', 'Challenge a user to a duel.')
            .addField('`!accept`', 'Accept an incoming duel.')
            .addField('`!cancel`', 'Cancel an incoming duel.');
        msg.channel.send(embed);
        return;
    },
    status: (args, msg, duel) => {
        return duel.displayStatus(msg);
    },
    duel: (args, msg, duel, dice) => {
        if (state.getState().getCurrentDuel(msg.author.id)) {
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription('You already are in a duel! Check your current duel status with `!status`!');
            msg.channel.send(embed);
            return;
        }
        if (`<@${msg.author.id.replace('!', '')}>` === args[0].replace('!', '')){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription('You cannot duel yourself!');
            msg.channel.send(embed);
            return;
        }
        state.getState().duels.push(new Duel(`<@${msg.author.id}>`, args[0], dice));
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`${args[0]}, you have been challenged to a Bondage Arena duel! Write \`!accept\` to accept or \`!cancel\` to decline.`);
        msg.channel.send(embed);
        return;
    },
    accept: (args, msg, currentDuel) => {
        return currentDuel.accept(msg);
    },
    cancel: (args, msg, currentDuel) => {
        return currentDuel.cancel(msg);
    },
    classSelect: (args, msg, currentDuel) => {
        currentDuel.state.nextState('class', msg, args);
    }
};

module.exports = generics;