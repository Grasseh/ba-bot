const { help, status, duel, accept, cancel } = require('./commands/generics');
const { stand, move } = require('./commands/combat');


let commands = {
    help : help,
    status : status,
    duel : duel,
    accept : accept,
    cancel : cancel,
    stand : stand
}

module.exports = commands;