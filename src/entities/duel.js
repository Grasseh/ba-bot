const embedUtils = require('../utils/embeds');
const crypto = require("crypto");
const state = require('../state');
const Player = require('./player');
const stateFactory = require('../duelstates/statefactory');

class Duel{
    constructor(playerOne, invited, dice){
        stateFactory.createState('waiting', this, dice);
        this.turnphase = "";
        this.id = crypto.randomBytes(32).toString("hex");
        this.players = [playerOne.replace('!','')];
        this.invited = [invited.replace('!','')];
        this.playerstates = [];
        this.turnPlayer = -1;
    }

    accept(msg){
        this.players.push(`<@${msg.author.id}>`);
        this.invited = this.invited.filter(inv => inv !== `<@${msg.author.id}>`);
        this.state.nextState();
        for(let player of this.players){
            this.playerstates.push(new Player(player));
        }
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Duel has begun!`);
        msg.channel.send(embed);
        this.state.run(msg);
    }

    cancel(msg){
        state.getState().duels = state.getState().duels.filter(duel => duel !== this);
        let embed = embedUtils.getCombatEmbed()
            .setDescription(`Duel has been cancelled!`);
        msg.channel.send(embed);
    }

    isPlaying(){
        return typeof(this.state) !== "WaitingState";
    }
    
    isPlayerTurn(player){
        return player === this.getCurrentPlayer().name;
    }

    getCurrentPlayer(){
        return this.playerstates[this.turnPlayer];
    }

    getOtherPlayer(){
        //Note : To be Removed if more than duels are implemented
        return this.playerstates[(this.turnPlayer + 1) % 2];
    }

    displayStatus(msg){
        if(this.isPlaying){
            return this.displayPlaying(msg);
        }
        return this.displayWaiting(msg);
    }

    displayWaiting(msg){
        let embed = embedUtils.getStatusEmbed()
            .setDescription(`${this.players[0]}, you are currently waiting for your partner to accept your challenge.`)
            .addField(`Waiting List`, `${this.invited[0]} you have been challenged to a Bondage Arena duel! Write \`!accept\` to accept or \`!cancel\` to decline.`);

        msg.channel.send(embed);
    }
    
    displayPlaying(msg){
        let embed = embedUtils.getStatusEmbed()
        let no = 0;
        for(let player of this.playerstates){
            no++;
            let restraints = "";
            let status = "";
            for(let restraint of player.restraints){
                restraints += `${restraint.getName()} - ${restraint.getLocation()} - ${restraint.getDifficulty()} - ${restraint.getDescription()}\n`;
            }
            for(let effect of player.effects){
                status += effect.display();
            }
            embed.addField(`Player #${no} `, `
                **${player.name}**
                Class : ${player.getClassName()}\n
                Restraints : ${restraints}\n
                Status effects : ${status}\n
            `);
        }
        msg.channel.send(embed);
    }
}

module.exports = Duel;