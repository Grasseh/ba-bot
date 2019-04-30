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
        return this.playerstates.length !== 0;
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
        if(this.isPlaying()){
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
        let no = 0;
        for(let player of this.playerstates){
            let playerEmbed = embedUtils.getStatusEmbed();
            let restraintsEmbed = embedUtils.getStatusEmbed();
            let statusEmbed = embedUtils.getStatusEmbed();
            no++;
            playerEmbed.addField(`Player #${no}`, `**${player.name}**\n Class : ${player.getClassName()}`);

            restraintsEmbed.addField(`Restraints`, player.name);
            statusEmbed.addField(`Status Effects`, player.name);
            for(let restraint of player.restraints){
                restraintsEmbed.addField(restraint.getName(), `${restraint.getLocation()} - ${restraint.getDifficulty()} - ${restraint.getDescription()}`);
            }
            for(let effect of player.effects){
                if(!statusEmbed.hidden){
                    statusEmbed.addField(effect.getName(), effect.display());
                }
            }
            msg.channel.send(playerEmbed);
            msg.channel.send(restraintsEmbed);
            msg.channel.send(statusEmbed);
        }
    }
}

module.exports = Duel;