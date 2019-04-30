const DuelState = require('./DuelState');
const stateFactory = require('./stateFactory');
const state = require('../state');
const embedUtils = require('../utils/embeds'); 
const FullyBound = require('../status/fullybound');

class StartTurnState extends DuelState{
    getValidActions(){
        return ['status', 'stand', 'move'];
    }

    nextState(action, msg){
        let canMove = this.duel.getCurrentPlayer().canMove();
        let canStand = this.duel.getCurrentPlayer().canStand();
        if (action === 'stand' && (canStand || !canMove)){
            this.duel.getCurrentPlayer().stand();
            stateFactory.createState('action', this.duel, this.dice)
            this.duel.state.run(msg);
            return;
        }
        if (action === 'move' && canMove){
            stateFactory.createState('move', this.duel, this.dice)
            this.duel.state.run(msg);
            return;
        }
        let embed = embedUtils.getPlayerErrorEmbed()
            .setDescription(`Invalid command! ${this.duel.getCurrentPlayer().name}'s turn.`)
        if(canMove && canStand)
            embed.addField(`Actions available:`, `Stand Still with !stand or Move with !move`);
        if(canMove && !canStand)
            embed.addField(`Actions available:`, `Move with !move`);
        if(!canMove)
            embed.addField(`Actions available:`, `Stand Still with !stand`);
        msg.channel.send(embed);
    }

    run(msg){
        this.duel.turnPlayer = (this.duel.turnPlayer + 1) % this.duel.playerstates.length;
        let gameOver = this.checkWinCondition(msg);
        if(gameOver){
            return;
        }
        this.duel.getCurrentPlayer().cooldown();
        this.duel.getOtherPlayer().cooldownOther();
        let canMove = this.duel.getCurrentPlayer().canMove();
        let canStand = this.duel.getCurrentPlayer().canStand();
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`Beginning of ${this.duel.getCurrentPlayer().name}'s turn!`)
        if(canMove && canStand)
            embed.addField(`Actions available:`, `Stand Still with !stand or Move with !move`);
        if(canMove && !canStand)
            embed.addField(`Actions available:`, `Move with !move`);
        if(!canMove)
            embed.addField(`Actions available:`, `Stand Still with !stand`);
        msg.channel.send(embed);
    }

    checkWinCondition(msg){
        if(this.duel.getCurrentPlayer().isFullExtreme()){
            let fullyBound = this.duel.getCurrentPlayer().effects.filter(e => e.name === "Fully Bound");
            if(fullyBound.length > 0){
                fullyBound = fullyBound[0];
                if(fullyBound.time >= 1){
                    let embed = embedUtils.getEndOfGameEmbed()
                        .setDescription(`${this.duel.getCurrentPlayer().name} is completely bound with extreme restraints!\n${this.duel.getOtherPlayer().name} wins in 1 turn if no restraints are loosened!`);
                    msg.channel.send(embed);
                    return false;
                }
                this.duel.displayStatus(msg);
                let embed = embedUtils.getEndOfGameEmbed()
                    .setDescription(`${this.duel.getCurrentPlayer().name} has been completely bound with extreme restraints for 2 turns!\n${this.duel.getOtherPlayer().name} wins!!!!`);
                msg.channel.send(embed);
                state.getState().duels = state.getState().duels.filter(d => d.id !== this.duel.id);
                return true;
            }
            this.duel.getCurrentPlayer().addEffect(new FullyBound());
            let embed = embedUtils.getEndOfGameEmbed()
                .setDescription(`${this.duel.getCurrentPlayer().name} is completely bound with extreme restraints!\n${this.duel.getOtherPlayer().name} wins in 2 turns if no restraints are loosened!`);
            msg.channel.send(embed);
            return false;
        }
        this.duel.getCurrentPlayer().effects = this.duel.getCurrentPlayer().effects.filter(e => e.name !== "Fully Bound");
        return false;
    }
}

module.exports = StartTurnState;
