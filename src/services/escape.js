const state = require('../state');
const AutoEscape = require('../status/autoEscape');
const Discord = require('discord.js');

class Escape{
    escape(player, restraintToEscape, position, dice, msg){
        //Attempt auto-escape
        for(let status of player.effects){
            if(status.name === "Auto Escape" && status.binding === restraintToEscape.id && restraintToEscape.difficulty === 1){
                this.freeFrom(restraintToEscape, player, msg);
                return { valid: true, changedState: false };
            }
        }
        let diceRoll = dice.d20();
        let totalRoll = diceRoll.sum;
        let critFail = totalRoll === 1;
        let additionals = [];
        //Add Player hit effects
        for (let effect of player.effects) {
            let toEscape = effect.toEscape();
            if (toEscape !== 0) {
                additionals.push({ name: effect.name, value: toEscape });
                totalRoll += toEscape;
            }
            let toEscapeLegs = effect.toEscapeLegs();
            if (toEscapeLegs !== 0 && position === 'legs') {
                additionals.push({ name: effect.name, value: toEscapeLegs });
                totalRoll += toEscapeLegs;
            }
            let toEscapeGagsHarderThanEasy = effect.toEscapeGagsHarderThanEasy();
            if (toEscapeGagsHarderThanEasy !== 0 && position === 'head' && restraintToEscape.difficulty > 1) {
                additionals.push({ name: effect.name, value: toEscapeGagsHarderThanEasy });
                totalRoll += toEscapeGagsHarderThanEasy;
            }
            let toEscapeLegsHarderThanEasy = effect.toEscapeLegsHarderThanEasy();
            if (toEscapeLegsHarderThanEasy !== 0 && position === 'legs' && restraintToEscape.difficulty > 1) {
                additionals.push({ name: effect.name, value: toEscapeLegsHarderThanEasy });
                totalRoll += toEscapeLegsHarderThanEasy;
            }
        }
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`Escape roll for ${player.name}, attempting to free ${position}!`)
            .addField(`d20`, `${diceRoll.sum}`)
        for(let additional of additionals){
            embed.addField(additional.name, additional.value);
        }
        embed.addField(`total`, `${totalRoll}`);
        if(critFail){
            embed.addField(`CRITICAL FAIL!`, `Natural 1!`);
        }
        msg.channel.send(embed);

        let escapes = [
            this.escapeEasy.bind(this),
            this.escapeMedium.bind(this),
            this.escapeHard.bind(this),
            this.escapeExtreme.bind(this),
            this.escapeImpossible.bind(this),
        ];
        return escapes[restraintToEscape.difficulty - 1](player, restraintToEscape, position, totalRoll, critFail, msg);
    }

    escapeEasy(player, restraint, position, totalRoll, critFail, msg){
        if(critFail){
            this.increaseDifficulty(restraint, player, msg);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 3){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} failed to free itself from its ${restraint.name}!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 6){
            player.addEffect(new AutoEscape(restraint.id));
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} loosen slightly its ${restraint.name}. If it is not tightened, it can be auto-escaped next turn!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        //7+
        this.freeFrom(restraint, player, msg);
        return { valid: true, changedState: false };
    }

    escapeMedium(player, restraint, position, totalRoll, critFail, msg){
        if(critFail){
            this.increaseDifficulty(restraint, player, msg);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 6){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} failed to free itself from its ${restraint.name}!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 14){
            this.increaseDifficulty(restraint, player, msg, -1);
            return {valid : true, changedState : false};
        }
        //15+
        this.freeFrom(restraint, player, msg);
        return { valid: true, changedState: false };
    }


    escapeHard(player, restraint, position, totalRoll, critFail, msg){
        if(critFail){
            this.increaseDifficulty(restraint, player, msg);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 10){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} failed to free itself from its ${restraint.name}!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 16){
            this.increaseDifficulty(restraint, player, msg, -1);
            return {valid : true, changedState : false};
        }
        //17+
        this.increaseDifficulty(restraint, player, msg, -2);
        return { valid: true, changedState: false };
    }

    escapeExtreme(player, restraint, position, totalRoll, critFail, msg){
        if (critFail) {
            this.increaseDifficulty(restraint, player, msg);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 15){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} failed to free itself from its ${restraint.name}!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        if(totalRoll <= 18){
            this.increaseDifficulty(restraint, player, msg, -1);
            return {valid : true, changedState : false};
        }
        //19+
        this.increaseDifficulty(restraint, player, msg, -2);
        return { valid: true, changedState: false };
    }

    escapeImpossible(player, restraint, position, totalRoll, critFail, msg){
        if (critFail) {
            return {valid : true, changedState : true};
        }
        if(totalRoll <= 19){
            let embed = new Discord.RichEmbed()
                .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
                .setColor(0x0000AA)
                .setDescription(`${player.name} failed to free itself from its ${restraint.name}!`)
            msg.channel.send(embed);
            return {valid : true, changedState : false};
        }
        //20+
        this.increaseDifficulty(restraint, player, msg, -3);
        return { valid: true, changedState: false };
    }

    increaseDifficulty(restraint, player, msg, value = 1){
        this.removeEffects(restraint, player);
        restraint.difficulty += value;
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
        if(value > 0)
            embed.setDescription(`${player.name} increased its ${restraint.name} difficulty!`)
        if(value < 0)
            embed.setDescription(`${player.name} reduced its ${restraint.name} difficulty!`)
        let addedEffects = '';
        for (let StatusEffect of restraint.statusTable[restraint.difficulty - 1]) {
            player.addEffect(new StatusEffect(restraint.id));
            addedEffects += `${player.name} is now ${StatusEffect.name}!\n`;
        }
        if (addedEffects !== '')
            embed.addField(`Effects:`, addedEffects);
        embed.addField(`Difficulty:`, restraint.getDifficulty());
        embed.addField(`Description:`, restraint.getDescription());
        msg.channel.send(embed);
    }

    freeFrom(restraint, player, msg){
        this.removeRestraint(restraint, player);
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`${player.name} freed itself from its ${restraint.name}!`)
        msg.channel.send(embed);
    }

    removeEffects(restraint, player) {
        player.effects = player.effects.filter(e => e.binding !== restraint.id);
    }

    removeRestraint(restraint, player){
        //Remove Effect
        this.removeEffects(restraint, player);
        //Remove restraint
        player.restraints = player.restraints.filter(r => r.id !== restraint.id);
    }
}

module.exports = Escape;