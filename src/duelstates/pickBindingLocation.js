const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const Spell = require('../classes/spells/spell');

class PickBindingLocationState extends DuelState{
    getValidActions(){
        return ['status', 'cancel', 'bind'];
    }

    nextState(action, msg, args){
        if (action == 'bind'){
            let location = args[0].toLowerCase();
            let allowed = Object.keys(this.restraints);
            if (allowed.includes(location)){
                let difficultyTable = {Easy : 1, Medium : 2, Hard : 3, Extreme : 4, Impossible : 5};
                let difficulty = difficultyTable[this.difficulty];
                let genericSpell = new Spell();
                let enemy = this.enemy;
                let restraint = this.restraints[location];
                let embed = genericSpell.applyGenericBinding(enemy, restraint.name, [difficulty], 1, false, restraint.restraint);
                msg.channel.send(embed);
                stateFactory.createState('startTurn', this.duel, this.dice);
                return this.duel.state.run(msg);
            }
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location for a ${this.difficulty} binding!`)
                .addField('Actions available:', 'Pick a binding to place with !bind <location>')
                .addField('Available binding locations:', `${allowed}`);
            msg.channel.send(embed);
        }
    }

    prepare(difficulty, enemy, restraints) {
        this.difficulty = difficulty;
        this.enemy = enemy;
        this.restraints = restraints;
    }
}

module.exports = PickBindingLocationState;
