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
    },
    hug: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('hug', msg, args);
    },
    bind: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('bind', msg, args);
    },
    trapattack: (args, msg, currentDuel) => {
        if (!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)) {
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        if(!currentDuel.getCurrentPlayer().isTrapAttackEnabled()){
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('This command is currently not available!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState('trapattack', msg, args);
    },
    
}

module.exports = combat;