const state = require('./state');
const embedUtils = require('./utils/embeds');

class Preprocessor{
    constructor(){
        this.success = false;
        this.message = null;
        this.duel = null;
        this.notInDuel = ['help', 'duel'];
    }

    preprocess(cmd, msg){
        if(this.notInDuel.includes(cmd)){
            this.success = true;
            return this.getReturns();
        }
        this.duel = state.getState().getCurrentDuel(msg.author.id);
        if (!this.duel) {
            this.message = embedUtils.getPlayerErrorEmbed()
                .setDescription('You are not currently in a duel!');
            return this.getReturns();
        }
        if (!this.duel.state.isValidAction(cmd)){
            this.message = embedUtils.getPlayerErrorEmbed()
                .setDescription('You cannot currently use this command!');
            return this.getReturns();
        }
        this.success = true;
        return this.getReturns();
    }

    getReturns(){
        let success = this.success;
        let message = this.message;
        let duel = this.duel;
        return { success, message, duel };
    }
}

module.exports = Preprocessor;