const { help, status, duel, accept, cancel } = require('./commands/generics');
const { stand, move } = require('./commands/combat');
const commandPreProcessor = require('./commandPreProcessor');

let commands = {
    help : help,
    status : status,
    duel : duel,
    accept : accept,
    cancel : cancel,
    stand : stand
}

for(let key of Object.keys(commands)){
    let fn = commands[key];
    newFn = (args, msg, dice) => {
        let prep = new commandPreProcessor();
        let {success, message, duel} = prep.preprocess(key, msg);
        if(success){
            return fn(args, msg, duel, dice);
        }
        return msg.channel.send(message);
    }
    commands[key] = newFn;
}

module.exports = commands;