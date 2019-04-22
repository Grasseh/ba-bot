const Discord = require('discord.js');
const state = require('../state');
const Player = require('./player');
const WaitingState = require('../duelstates/waitingstate');

class Duel{
    constructor(playerOne, invited, dice){
        this.state = new WaitingState(this, dice);
        this.turnphase = "";
        this.players = [playerOne.replace('!','')];
        this.invited = [invited.replace('!','')];
        this.playerstates = [];
        this.turnPlayer = -1;
    }

    accept(msg){
        this.players.push(`<@${msg.author.id}>`);
        this.invited = this.invited.filter(inv => inv !== `<@${msg.author.id}>`);
        this.state = this.state.nextState();
        for(let player of this.players){
            this.playerstates.push(new Player(player));
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
            .setDescription(`Duel has begun!`);
        msg.channel.send(embed);
        this.state.run(msg);
    }

    cancel(msg){
        state.getState().duels = state.getState().duels.filter(duel => duel !== this);
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
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

    displayStatus(msg){
        if(this.isPlaying){
            return this.displayPlaying(msg);
        }
        return this.displayWaiting(msg);
    }

    displayWaiting(msg){
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
            .setDescription(`${this.players[0]}, you are currently waiting for your partner to accept your challenge.`)
            .addField(`Waiting List`, `${this.invited[0]} you have been challenged to a Bondage Arena duel! Write \`!accept\` to accept or \`!cancel\` to decline.`)

        msg.channel.send(embed);
    }
    
    displayPlaying(msg){
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00);
        let no = 0;
        for(let player of this.playerstates){
            no++;
            let restraints = "";
            let status = "";
            for(let restraint of player.restraints){
                restraints += `${restraint.name} - ${restraint.location} - ${restraint.difficulty}\n`;
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