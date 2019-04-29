const embedUtils = require('../utils/embeds');

let combat = {
    stand: (args, msg, currentDuel) => {
        //Check if user is in a duel and it is his turn
        if(!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)){
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.getCurrentPlayer().stand();
        currentDuel.state.nextState('stand', msg);
    },
    move: (args, msg, currentDuel) => {
        //Check if user is in a duel and it is his turn
        if(!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)){
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('move', msg);
    },
    attack: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('attack', msg, args);
    },
    escape: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('escape', msg, args);
    },
    increase: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('increase', msg, args);
    }
    
}

module.exports = combat;