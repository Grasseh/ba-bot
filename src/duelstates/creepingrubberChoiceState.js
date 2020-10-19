const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const Spell = require('../classes/spells/spell');
const RubberHood = require('../../../restraints/rubber/rubberHood');
const RubberJacket = require('../../../restraints/rubber/rubberJacket');
const RubberHobble = require('../../../restraints/rubber/rubberHobble');
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
        if(action === 'cancel'){
            let embed = embedUtils.getPlayerActionEmbed()
                .setDescription(`${this.duel.getCurrentPlayer().name} has decided to not creep any rubber!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            stateFactory.createState('startTurn', this.duel, this.dice);
            return this.duel.state.run(msg);
        }
        functions[action](msg, args);
    }

    moveBindingDown(msg, args){
        let location = args[0].toLowerCase();
        if (!['head', 'arms'].includes(location)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location to move down!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        let target = {
            'head' : 'arms',
            'arms' : 'legs'
        }[location];
        let source = this.getSourceBinding(location);

        if(!source){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Selected body part has no rubber restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move down!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        this.success(msg, source, target);
    }

    moveBindingUp(msg, args){
        let location = args[0].toLowerCase();
        if (!['legs', 'arms'].includes(location)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location to move up!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        let target = {
            'legs' : 'arms',
            'arms' : 'head'
        }[location];
        let source = this.getSourceBinding(location);

        if(!source){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Selected body part has no rubber restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move up!`);
            embed = this.generateActions(embed);
            msg.channel.send(embed);
            return;
        }
        this.success(msg, source, target);
    }

    moveBindingAny(msg, args){
        let location = args[0].toLowerCase();
        let target = args[0].toLowerCase();
        if (!['legs', 'head', 'arms'].includes(location) || !['legs', 'head', 'arms'].includes(target)){
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
                .setDescription(`Selected body part has no rubber restraint! ${this.duel.getCurrentPlayer().name} needs to pick a bound location to move!`);
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
        let allowed = 'head, arms';
        if (this.difficulty !== 'Easy')
            allowed += ', legs';

        let actions = 'Pick a binding to move with `!down`';
        if (this.difficulty !== 'Easy')
            actions += ' or `!up`';
        actions += ' `<location>`.';

        if (this.difficulty === 'Impossible')
            actions += ' You can also use `!any <source> <target>` to switch between legs and head due to the critical!';
        actions += ' You can also decide to not move any rubber with `!cancel`';

        embed
            .addField('Actions available:', actions)
            .addField('Available binding locations:', `${allowed}`);
        return embed;
    }

    restraint() {
        return {
            'legs': { restraint: RubberHood, name: 'Rubber Hobble Dress' },
            'arms': { restraint: RubberJacket, name: 'Rubber Straitjacket' },
            'head': { restraint: RubberHobble, name: 'Rubber Hood' }
        };
    }

    getSourceBinding(location) {
        console.log(this.enemy.restraints);
        console.log(this.restraint()[location]);
        let filtered = this.enemy.restraints.filter(r => r.name === this.restraint()[location]);
        if (filtered.count > 0)
            return filtered[0];
        return null;
    }

    run(msg){
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`Creeping Rubber! ${this.duel.getCurrentPlayer().name} needs to pick a movement location!`);
        embed = this.generateActions(embed);
        msg.channel.send(embed);
    }

    prepare(difficulty, enemy) {
        this.difficulty = difficulty;
        this.enemy = enemy;
    }
}

module.exports = CreepingRubberChoiceState;