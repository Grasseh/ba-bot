let Trap = require('./trap');
let EscapeClass = require('../services/escape');
let embedUtils = require('../utils/embeds');

class TighteningTrap extends Trap{
    //Does not target already impossible bondage
    activate(effectRoll, player, critFail, msg){
        let embed = embedUtils.getCombatEmbed();
            embed.setDescription(`${player.name} has been hit by a tightening trap!`);
        let effectTable = [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,4];
        let closures = [null, 
            this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateExtreme.bind(this),
        ]
        let difficulty = effectTable[effectRoll - 1];
        if(critFail)
            difficulty += 1;
        if(difficulty > 4)
            difficulty = 4;
        embed = closures[difficulty](embed, player, msg);
        msg.channel.send(embed);
        return effectRoll > 10;
    }

    activateEasy(embed){
        embed.addField(`Made it safe!`, `She comes out of the trap with her clothing slightly tighter fit, but no bindings increased!`);
        return embed;
    }

    activateMedium(embed, player, msg){
        embed.addField(`Standard trap!`, `Her highest binding increases by one tier of effect!`);
        let restraint = player.getRestraints().filter(x => x.difficulty !== 5).reduce((highest, currentRestraint) => currentRestraint.difficulty > highest.difficulty ? currentRestraint : highest); 
        if(restraint){
            let esc = new EscapeClass();
            esc.increaseDifficulty(restraint, player, msg, 1);
            return embed;
        }
        embed.addField(`Lucky!`, `No non-impossible bindings to be tightened!`);
    }

    activateHard(embed, player, msg){
        embed.addField(`Hard trap!`, `Her highest binding increases by two tiers of effect!`);
        let restraint = player.getRestraints().filter(x => x.difficulty !== 5).reduce((highest, currentRestraint) => currentRestraint.difficulty > highest.difficulty ? currentRestraint : highest); 
        if(restraint){
            let esc = new EscapeClass();
            esc.increaseDifficulty(restraint, player, msg, 2);
            return embed;
        }
        embed.addField(`Lucky!`, `No non-impossible bindings to be tightened!`);
        return embed;
    }

    activateExtreme(embed, player, msg){
        embed.addField(`Critical trap!`, `All current bindings become impossible! Looks like her escaping days are done!`);
        let restraints = player.getRestraints().filter(x => x.difficulty !== 5);
        let esc = new EscapeClass();
        for (let restraint of restraints){
            esc.increaseDifficulty(restraint, player, msg, 5);
        }
        return embed;
    }
}

module.exports = TighteningTrap;