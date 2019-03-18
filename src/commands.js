const { help, status, duel, accept, cancel } = require('./generics');


let commands = {
    help : help,
    status : status,
    duel : duel,
    accept : accept,
    cancel : cancel
}

module.exports = commands;