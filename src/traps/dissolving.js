let Trap = require('./trap');
let EscapeClass = require('../services/escape');
let embedUtils = require('../utils/embeds');

class DissolvingTrap extends Trap{
//May trigger on a lower-difficulty binding if no binding of the select difficulty is available.
//Turn not lost.

    activate(effectRoll, player, critFail, msg){
        let embed = embedUtils.getCombatEmbed();
            embed.setDescription(`${player.name} has been hit by a dissolving trap!`);
        let effectTable = [0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,4,4,5];
        let closures = [this.fizzle.bind(this), 
            this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateExtreme.bind(this),
            this.activateAll.bind(this),
        ]
        let difficulty = effectTable[effectRoll - 1];
        if(critFail)
            difficulty += 1;
        if(difficulty > 5)
            difficulty = 5;
        embed = closures[difficulty](embed, player, msg);
        msg.channel.send(embed);
        return false; //never skips a turn
    }

    fizzle(embed){
        embed.addField(`The trap fizzles!`, `What a loss. No effect.`);
    }

    activateEasy(embed, player, msg){
        embed.addField(`Simple trap!`, `Dissolves up to one random Easy binding!`);
        let restraints = player.getRestraints().filter(x => x.difficulty <= 1);
        if(restraints.length > 0){
            this.dissolve(msg, player, 1, 1);
            return embed;
        }
        embed.addField(`What a loss!`, `No Easy binding...`);
        return embed;
    }

    activateMedium(embed, player, msg){
        embed.addField(`Medium trap!`, `Dissolves up to two random Medium binding!`);
        let restraints = player.getRestraints().filter(x => x.difficulty <= 2);
        if(restraints.length > 0){
            this.dissolve(msg, player, 2, 2);
            return embed;
        }
        embed.addField(`What a loss!`, `No Medium or easier bindings...`);
        return embed;
    }

    activateHard(embed, player, msg){
        embed.addField(`Hard trap!`, `Dissolves up to two random Hard binding!`);
        let restraints = player.getRestraints().filter(x => x.difficulty <= 3);
        if(restraints.length > 0){
            this.dissolve(msg, player, 2, 3);
            return embed;
        }
        embed.addField(`What a loss!`, `No Hard or easier bindings...`);
        return embed;
    }

    activateExtreme(embed, player, msg){
        embed.addField(`Extreme trap!`, `Dissolves up to one random Hard binding!`);
        let restraints = player.getRestraints().filter(x => x.difficulty <= 4);
        if(restraints.length > 0){
            this.dissolve(msg, player, 1, 4);
            return embed;
        }
        embed.addField(`What a loss!`, `No Extreme or easier bindings...`);
        return embed;
    }

    activateAll(embed, player, msg){
        let esc = new EscapeClass();
        embed.addField(`Extreme trap!`, `Dissolves all non-impossible bindings!`);
        let restraints = player.getRestraints().filter(x => x.difficulty <= 4);
        if(restraints.length > 0){
            for(let restraint in restraints){
                esc.freeFrom(restraint, player, msg);
            }
            return embed;
        }
        embed.addField(`What a loss!`, `No Extreme or easier bindings...`);
        return embed;
    }

    dissolve(msg, player, restraintsRemaining, highest){
        let esc = new EscapeClass();
        for(let difficulty = 5; difficulty >= 1; difficulty--){
            if(difficulty > highest)
                continue;
            let restraints = player.getRestraints().filter( x => x.difficulty === difficulty);
            while(restraintsRemaining > 0 && restraints.length > 0){
                let restraint = restrains[this.dice.xDy(1, restraints.length) - 1];
                esc.freeFrom(restraint, player, msg);
                restraints = restraints.filter(r => r.id !== restraint.id);
                restraintsRemaining--;
            }
            if(restraintsRemaining === 0)
                return;
        }
    }
}

module.exports = DissolvingTrap;