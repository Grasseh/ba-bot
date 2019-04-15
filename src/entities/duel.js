const Discord = require('discord.js');
const state = require('../state');
const Player = require('./player');
const Dice = require('../utils/dice');

class Duel{
    constructor(playerOne, invited){
        this.status = "waiting";
        this.turnphase = "";
        this.players = [playerOne.replace('!','')];
        this.invited = [invited.replace('!','')];
        this.playerstates = [];
        this.turnPlayer = -1;
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
        this.beginDuel(msg);
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
        return this.status = "playing";
    }
    
    isPlayerTurn(player){
        return player === this.getCurrentPlayer().name;
    }

    getCurrentPlayer(){
        return this.playerstates[this.turnPlayer];
    }

    nextPlayer(msg){
        this.turnPlayer = (this.turnPlayer + 1) % this.playerstates.length;
        this.beginTurn(msg);
    }

    beginDuel(msg){
        let highest = 0;
        let highestId = -2;
        let i = -1;
        let tied = true;
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Duel has been begun! Rolls for initiative!`);
        msg.channel.send(embed);
        while(tied){
            highest = 0;
            i = -1;
            for (let player of this.playerstates) {
                let roll = Dice.d20();
                let embed = new Discord.RichEmbed()
                    .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                    .setColor(0x0000AA)
                    .setDescription(`Initiative roll for ${player.name}!`)
                    .addField(`d20`, `${roll.sum}`);
                msg.channel.send(embed);
                if (roll.sum === highest) {
                    tied = true;
                }
                if (roll.sum > highest) {
                    highest = roll.sum;
                    highestId = i;
                    tied = false;
                }
                i++;
            }
        }
        this.turnPlayer = highestId;
        this.nextPlayer(msg);
    }

    beginTurn(msg){
        this.turnphase = "start";
        this.getCurrentPlayer().cooldown();
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Beginning of ${this.playerstates[this.turnPlayer].name}'s turn!`)
            .addField(`Actions available:`, `Stand Still with !stand or Move with NOTIMPLEMENTED`);
        msg.channel.send(embed);
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
                Class : ${player.class}\n
                Restraints : ${restraints}\n
                Status effects : ${status}\n
            `);
        }
        msg.channel.send(embed);
    }
}

module.exports = Duel;