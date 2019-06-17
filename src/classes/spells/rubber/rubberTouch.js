const Spell = require('../spell');
const embedUtils = require('../../../utils/embeds');
const stateFactory = require('../../../duelstates/stateFactory');
const RubberHood = require('../../../restraints/rubber/rubberHood');
const RubberJacket = require('../../../restraints/rubber/rubberJacket');
const RubberHobble = require('../../../restraints/rubber/rubberHobble');

class RubberBall extends Spell{
    constructor(){
        super();
        this.melee = true;
        this.name = 'Rubber Touch';
    }

    cast({enemy, effectRoll, crit, duel, msg, dice}){
        let effectTable = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5];
        let closures = [this.activateEasy.bind(this),
            this.activateMedium.bind(this),
            this.activateHard.bind(this),
            this.activateExtreme.bind(this),
            this.activateCrit.bind(this),
        ];
        let difficulty = effectTable[effectRoll - 1];
        if(crit)
            difficulty += 1;
        if(difficulty > 5)
            difficulty = 5;
        return closures[difficulty-1](enemy, duel, msg, dice);
    }

    activateEasy(enemy, duel, msg, dice){
        let embed = embedUtils.getCombatEmbed();
        embed.setDescription(`${enemy.name} has been hit by Rubber Touch!\n One hit on a random location!`);
        this.applyRandom(1, msg, enemy, dice);
        return {embed, changedState : false};
    }

    activateMedium(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by Rubber Touch!\n One hit on a chosen location.`)
            .addField('Actions available:', 'Pick a binding to place with !bind <location>')
            .addField('Available binding locations:', 'head, arms, legs');
        stateFactory.createState('pickBindingLocation', duel, dice);
        let restraints = {
            arms: { restraint: RubberJacket, name: 'Rubber Straitjacket' },
            legs: { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
            head: { restraint: RubberHood, name: 'Rubber Hood' }
        };
        duel.state.prepare('Easy', enemy, restraints);
        return {embed, changedState : true};
    }

    activateHard(enemy, duel, msg, dice){
        let embed = embedUtils.getCombatEmbed();
        embed.setDescription(`${enemy.name} has been hit by Rubber Touch!\n Two hits on a random location!`);
        this.applyRandom(2, msg, enemy, dice);
        return {embed, changedState : false};
    }

    activateExtreme(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by Rubber Touch!\n Two hits on a chosen location.`)
            .addField('Actions available:', 'Pick a binding to place with !bind <location>')
            .addField('Available binding locations:', 'head, arms, legs');
        stateFactory.createState('pickBindingLocation', duel, dice);
        let restraints = {
            arms: { restraint: RubberJacket, name: 'Rubber Straitjacket' },
            legs: { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
            head: { restraint: RubberHood, name: 'Rubber Hood' }
        };
        duel.state.prepare('Medium', enemy, restraints);
        return {embed, changedState : true};
    }

    activateCrit(enemy, duel, msg, dice){
        let embed = embedUtils.getPlayerActionEmbed();
        embed.setDescription(`${enemy.name} has been hit by Rubber Touch!\n Four hits on a chosen location.`)
            .addField('Actions available:', 'Pick a binding to place with !bind <location>')
            .addField('Available binding locations:', 'head, arms, legs');
        stateFactory.createState('pickBindingLocation', duel, dice);
        let restraints = {
            arms: { restraint: RubberJacket, name: 'Rubber Straitjacket' },
            legs: { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
            head: { restraint: RubberHood, name: 'Rubber Hood' }
        };
        duel.state.prepare('Extreme', enemy, restraints);
        return {embed, changedState : true};
    }

    applyRandom(nbHits, msg, enemy, dice){
        let roll = dice.xDy(1, 6).sum;
        let embed = embedUtils.getCombatEmbed()
            .setDescription('Location roll for Rubber Touch!')
            .addField('d6', `${roll}`);
        msg.channel.send(embed);
        let effectTable = [null, 0, 0, 1, 1, 1, 2];
        let restraint = [
            { restraint: RubberHood, name: 'Rubber Hood' },
            { restraint: RubberJacket, name: 'Rubber Straitjacket' },
            { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
        ];
        let genericSpell = new Spell();
        embed = genericSpell.applyGenericBinding(enemy, restraint[effectTable[roll]].name, [nbHits], 1, false, restraint[effectTable[roll]].restraint);
        msg.channel.send(embed);
    }
}

module.exports = RubberBall;