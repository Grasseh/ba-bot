const Spell = require('../spell');
const LatexCorset = require('../../../restraints/skunk/latexCorset');
const LatexMittens = require('../../../restraints/skunk/latexMittens');
const LatexHeels = require('../../../restraints/skunk/latexHeel');
const LatexMuzzle = require('../../../restraints/skunk/latexMuzzle');
const embedUtils = require('../../../utils/embeds');
const stateFactory = require('../../../duelstates/stateFactory');

class LatexHug extends Spell{
    constructor(){
        super();
        this.melee = true;
        this.name = 'Latex Hug';
    }

    //+2 if arms are bound
    toHit({target : enemy}){
        let areArmsBound = enemy.effects.some(x => ['Bound', 'Harnessed', 'Mittened'].includes(x.name));
        return areArmsBound ? 2 : 0;
    }

    cast({enemy, effectRoll, crit, duel, msg, dice}){
        let effectTable = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3];
        let closures = [this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateCrit.bind(this),
        ];
        let difficulty = effectTable[effectRoll - 1];
        if(crit)
            difficulty += 1;
        if(difficulty > 3)
            difficulty = 3;
        return closures[difficulty](enemy, duel, msg, dice);
    }

    activateCrit(enemy, duel, msg){
        let embed = embedUtils.getCombatEmbed();
        embed.setDescription(`${enemy.name} has been hit by a Latex Hug!\n Snuggle! Medium bindings in every location!`);
        let embeds = [];
        embeds.push(this.applyGenericBinding(enemy, 'Latex Mittens', [2], 1, false, LatexMittens));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Heels', [2], 1, false, LatexHeels));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Corset', [2], 1, false, LatexCorset));
        embeds.push(this.applyGenericBinding(enemy, 'Latex Muzzle', [2], 1, false, LatexMuzzle));
        for(let e of embeds){
            msg.channel.send(e);
        }
        return {embed, changedState : false};
    }

    activateEasy(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by a Latex Hug!\n Easy binding in any location except for the gag!`)
            .addField('Actions available:', 'Pick a binding to place with !hug <location>')
            .addField('Available binding locations:', 'arms, torso, legs');
        stateFactory.createState('latexHugChoice', duel, dice);
        duel.state.prepare('Easy', enemy);
        return {embed, changedState : true};
    }

    activateMedium(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by a Latex Hug!\n Medium binding in any location except for the gag!`)
            .addField('Actions available:', 'Pick a binding to place with !hug <location>')
            .addField('Available binding locations:', 'arms, torso, legs');
        stateFactory.createState('latexHugChoice', duel, dice);
        duel.state.prepare('Medium', enemy);
        return {embed, changedState : true};
    }

    activateHard(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by a Latex Hug!\n Smooch! Hard binding in any location!`)
            .addField('Actions available:', 'Pick a binding to place with !hug <location>')
            .addField('Available binding locations:', 'head, arms, torso, legs');
        stateFactory.createState('latexHugChoice', duel, dice);
        duel.state.prepare('Hard', enemy);
        return {embed, changedState : true};
    }

}

module.exports = LatexHug;