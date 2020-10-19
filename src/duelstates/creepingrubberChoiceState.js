const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const Spell = require('../classes/spells/spell');
const LatexCorset = require('../restraints/skunk/latexCorset');
const LatexHeels = require('../restraints/skunk/latexHeels');
const LatexMuzzle = require('../restraints/skunk/latexMuzzle');
const Escape = require('../services/escape');

class CreepingRubberChoiceState extends DuelState{
    getValidActions(){
        let actions = ['status', 'cancel', 'down'];
        if(this.difficulty !== 'Easy')
            actions.push('up');
        if (this.difficulty === 'Impossible')
            actions.push('any');
        return actions;
    }

    nextState(action, msg, args){
        let functions = {
            'down' : this.moveBindingDown.bind(this),
            'up' : this.moveBindingUp.bind(this),
            'any' : this.moveBindingAny.bind(this),
        };
        functions[action](msg, args);
    }

    moveBindingDown(msg, args){
        let location = args[0].toLowerCase();
        if (!['head', 'torso'].includes(location)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location to move down!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        let target = {
            'head' : 'torso',
            'torso' : 'legs'
        }[location];
        let source = this.getSourceBinding(location);

        if(!source){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Selected body part has no restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move down!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        this.success(msg, source, target);
    }

    moveBindingUp(msg, args){
        let location = args[0].toLowerCase();
        if (!['legs', 'torso'].includes(location)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location to move up!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        let target = {
            'legs' : 'torso',
            'torso' : 'head'
        }[location];
        let source = this.getSourceBinding(location);

        if(!source){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Selected body part has no restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move up!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        this.success(msg, source, target);
    }

    moveBindingAny(msg, args){
        let location = args[0].toLowerCase();
        let target = args[0].toLowerCase();
        if (!['legs', 'torso', 'arms'].includes(location) || !['legs', 'torso', 'arms'].includes(target)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a valid location to move!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        if(location === target){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid command! ${this.duel.getCurrentPlayer().name} may not pick the same location as source and target!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }

        let source = this.getSourceBinding(location);

        if(!source){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Selected body part has no restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        this.success(msg, source, target);
    }

    success(msg, source, target){
        let genericSpell = new Spell();
        let enemy = this.enemy;
        let difficulty = source.difficulty;
        let escape = new Escape();
        let sourceDifficulty = {
            'Easy' : 0,
            'Medium' : 1,
            'Hard' : 1,
            'Impossible' : 2,
        }[this.difficulty];

        escape.removeRestraint(source, enemy);
        if(sourceDifficulty > 0){
            let embed = genericSpell.applyGenericBinding(enemy, this.restraint()[source.location].name, [2], 1, false, this.restraint()[source.location].restraint);
            msg.channel.send(embed);
        }
        let embed = genericSpell.applyGenericBinding(enemy, this.restraint()[target].name, [difficulty], 1, false, this.restraint()[target].restraint);
        msg.channel.send(embed);
        stateFactory.createState('startTurn', this.duel, this.dice);
        return this.duel.state.run(msg);
    }

    generateActions(embed) {
        let allowed = 'head, torso';
        if (this.difficulty !== 'Easy')
            allowed += ', legs';

        let actions = 'Pick a binding to move with !down ';
        if (this.difficulty !== 'Easy')
            actions += '/up';
        actions += ' <location>';

        if (this.difficulty === 'Impossible')
            actions += '. You can also use !any <source> <target> to switch between legs and head due to the critical!';

        embed
            .addField('Actions available:', actions)
            .addField('Available binding locations:', `${allowed}`);
        return embed;
    }

    restraint() {
        return {
            'legs': { restraint: LatexHeels, name: 'Latex Heels' },
            'torso': { restraint: LatexCorset, name: 'Latex Corset' },
            'head': { restraint: LatexMuzzle, name: 'Latex Muzzle' }
        };
    }

    getSourceBinding(location) {
        let filtered = this.enemy.restraints.filter(r => r.name === this.restraint()[location]);
        if (filtered.count > 0)
            return filtered[0];
        return null;
    }

    prepare(difficulty, enemy) {
        this.difficulty = difficulty;
        this.enemy = enemy;
    }
}

module.exports = CreepingRubberChoiceState;