const DuelState = require('./DuelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds'); 

class StartTurnState extends DuelState{
    getValidActions(){
        return ['status', 'stand'];
    }

    nextState(action, msg){
        if (action == 'stand')
            stateFactory.createState('action', this.duel, this.dice)
        this.duel.state.run(msg);
    }

    run(msg){
        this.duel.turnPlayer = (this.duel.turnPlayer + 1) % this.duel.playerstates.length;
        let gameOver = this.checkWinCondition();
        if(gameOver){
            return this.duel.gameOver();
        }
        this.duel.getCurrentPlayer().cooldown();
        this.duel.getOtherPlayer().cooldownOther();
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`Beginning of ${this.duel.playerstates[this.duel.turnPlayer].name}'s turn!`)
            .addField(`Actions available:`, `Stand Still with !stand or Move with NOTIMPLEMENTED`);
        msg.channel.send(embed);
    }

    checkWinCondition(){
        if(this.duel.getCurrentPlayer().isFullExtreme()){
            //Check if is currently in lose condition
            //If yes, and one turn, display message
            //If yes, and zero turn, GAME OVER and return true
            //If no, create status at two turns and display message
        }
        return false;
    }
}

module.exports = StartTurnState;
