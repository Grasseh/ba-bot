const Spell = require('../spell');
const LatexCorset = require('../../../restraints/skunk/latexCorset');
const LatexMittens = require('../../../restraints/skunk/latexMittens');
const LatexHeels = require('../../../restraints/skunk/latexHeel');
const LatexMuzzle = require('../../../restraints/skunk/latexMuzzle');
const embedUtils = require('../../../utils/embeds');
const stateFactory = require('../../../duelstates/stateFactory');

class FullSkunking extends Spell{
    constructor(){
        super();
        this.ultimate = true;
        this.spell = true;
        this.name = "Full Skunking";
    }

    cast({enemy, effectRoll, crit, duel, msg, dice}){
        let effectTable = [0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,4];
        let closures = [this.activateOne.bind(this), 
            this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateCrit.bind(this),
        ]
        let difficulty = effectTable[effectRoll - 1];
        if(crit)
            difficulty += 1;
        if(difficulty > 4)
            difficulty = 4;
        return closures[difficulty](enemy, msg, duel, dice);
    }

    activateCrit(enemy, msg){
        let description = `${enemy.name} has been hit by Full Skunking!\n Fully Skunked! Impossible in all areas!`;
        return this.activate(enemy, 5, description, msg);
    }

    activateEasy(enemy, msg){
        let description = `${enemy.name} has been hit by Full Skunking!\n All Easy bindings applied!`;
        return this.activate(enemy, 1, description, msg);
    }

    activateMedium(enemy, msg){
        let description = `${enemy.name} has been hit by Full Skunking!\n All Medium bindings applied!`;
        return this.activate(enemy, 2, description, msg);
    }

    activateHard(enemy, msg){
        let description = `${enemy.name} has been hit by Full Skunking!\n All Hard bindings applied!`;
        return this.activate(enemy, 3, description, msg);
    }

    activate(enemy, difficulty, description, msg){
        let embed = embedUtils.getCombatEmbed();
            embed.setDescription(description);
        let embeds = [];
        embeds.push(this.applyGenericBinding(enemy, 'Latex Mittens', [difficulty], 1, false, LatexMittens));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Heels', [difficulty], 1, false, LatexHeels));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Corset', [difficulty], 1, false, LatexCorset));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Muzzle', [difficulty], 1, false, LatexMuzzle));
        for(let e of embeds){
            msg.channel.send(e);
        }
        return {embed, changedState : false};
    }

    activateOne(enemy, msg, duel, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by a Full Skunking!\n Easy binding of any type.`)
            .addField(`Actions available:`, `Pick a binding to place with !bind <location>`)
            .addField(`Available binding locations:`, `head, arms, torso, legs`)
        stateFactory.createState('pickBindingLocation', duel, dice);
        let restraints = {
            arms: { restraint: LatexMittens, name: 'Latex Mittens' },
            legs: { restraint: LatexHeels, name: 'Latex Heels' },
            torso: { restraint: LatexCorset, name: 'Latex Corset' },
            head: { restraint: LatexMuzzle, name: 'Latex Muzzle' }
        };
        duel.state.prepare("Easy", enemy, restraints);
        return {embed, changedState : true};
    }

}

module.exports = FullSkunking;