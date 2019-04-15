let commands = require('./commands.js');
const state = require('./state');
const Dice = require('./utils/dice');

class Processor {
    processMessage(msg, dice = new Dice()) {
        let message = msg.content;
        let user = msg.author;
        let channel = msg.channel;
        let guild = msg.guild;
        state.getState().logger.info(message);
        state.getState().logger.info(user.username);
        state.getState().logger.info(user.id);
        state.getState().logger.info(channel.id);
        state.getState().logger.info(guild.id);
        if (this.isCommand(message)) {
            var args = message.substring(1).split(' ');
            var cmd = args[0].toLowerCase();

            args = args.splice(1);
            if(cmd in commands){
                commands[cmd](args, msg, dice);
                return;
            }
            return;
        }
    }
    isCommand(msg){
        let prefix = msg.substring(0, 1);
        return prefix === '!'
    }
}

module.exports = new Processor;