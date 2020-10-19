const embedUtils = require('../utils/embeds');

let combat = {
    trapattack: (args, msg, currentDuel) => {
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
};

[
    'stand',
    'move',
    'attack',
    'escape',
    'increase',
    'hug',
    'bind',
    'up',
    'down',
    'any'
].forEach(name => {
    combat[name] = (args, msg, currentDuel) => {
        if(!currentDuel.isPlayerTurn(`<@${msg.author.id}>`)){
            let embed = embedUtils.getPlayerErrorEmbed();
            embed.setDescription('It is currently not your turn!');
            msg.channel.send(embed);
            return;
        }
        currentDuel.state.nextState(name, msg, args);
    };
});

module.exports = combat;