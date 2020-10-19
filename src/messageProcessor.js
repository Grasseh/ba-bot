let commands = require('./commands.js');
const state = require('./state');
const embedUtils = require('./utils/embeds');
const Dice = require('./utils/dice');

class Processor {
    processMessage(msg, dice = new Dice()) {
        try{
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
                let args = message.substring(1).split(' ');
                let cmd = args[0].toLowerCase();

                args = args.splice(1);
                if(cmd in commands){
                    commands[cmd](args, msg, dice);
                    return;
                }
                return;
            }
        }
        catch(err){
            let embed = embedUtils.getBotErrorEmbed();
            embed.setDescription('An error has occured! Please contact Erika for help!');
            embed.addField('Error:', err.message); //TODO: Remove
            state.getState().logger.error('ERROR');
            state.getState().logger.error(err.message);
            state.getState().logger.error(err.stack);
            console.log(err);
            msg.channel.send(embed);
        }
    }
    isCommand(msg){
        let prefix = msg.substring(0, 1);
        return prefix === '!';
    }
}

module.exports = new Processor;