const { help, status, duel, accept, cancel, classSelect } = require('./commands/generics');
const { stand, move, attack, escape, increase, hug, bind, up, down, any, trapattack } = require('./commands/combat');
const commandPreProcessor = require('./commandPreProcessor');

let commands = {
    help : help,
    status : status,
    duel : duel,
    accept : accept,
    cancel : cancel,
    stand : stand,
    attack : attack,
    increase : increase,
    up : up,
    down : down,
    any : any,
    escape : escape,
    move : move,
    bind : bind,
    trapattack : trapattack,
    hug : hug,
    class : classSelect
};

for(let key of Object.keys(commands)){
    let fn = commands[key];
    let newFn = (args, msg, dice) => {
        let prep = new commandPreProcessor();
        let {success, message, duel} = prep.preprocess(key, msg);
        if(success){
            return fn(args, msg, duel, dice);
        }
        return msg.channel.send(message);
    };
    commands[key] = newFn;
}

module.exports = commands;