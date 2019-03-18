const Discord = require('discord.js');
const state = require('../state');
const Player = require('./player');

class Duel{
    constructor(playerOne, invited){
        this.status = "waiting";
        this.turnphase = "";
        this.players = [playerOne.replace('!','')];
        this.invited = [invited.replace('!','')];
        this.playerstates = [];
        this.turn = 0;
    }

    accept(msg){
        this.players.push(`<@${msg.author.id}>`);
        this.invited = this.invited.filter(inv => inv !== `<@${msg.author.id}>`);
        this.status = "playing";
        for(let player of this.players){
            this.playerstates.push(new Player(player));
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
            .setDescription(`Duel has begun!`);
        msg.channel.send(embed);
        this.beginTurn(msg);
    }

    cancel(msg){
        state.getState().duels = state.getState().duels.filter(duel => duel !== this);
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel Status!', state.getState().bot.user.displayAvatarURL)
            .setColor(0xAAAA00)
            .setDescription(`Duel has been cancelled!`);
        msg.channel.send(embed);
    }

    beginTurn(msg){

    }

    displayStatus(msg){
        let status = {
            "waiting" : this.displayWaiting.bind(this),
            "playing" : this.displayPlaying.bind(this)
        }
        status[this.status](msg);
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
        for(let player of this.playerstates){
            let restraints = "";
            let status = "";
            for(restraint in player.restraints){
                restraints += `${restraint.name} - ${restraint.location} - ${restraint.difficulty}`;
            }
            embed.addField(`Player : ${player.name}`, `
                Class : ${player.class}\n
                Restraints : ${restraints}\n
                Status effects : ${status}\n
            `);
        }
        msg.channel.send(embed);
    }
}

module.exports = Duel;