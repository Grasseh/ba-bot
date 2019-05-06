const DuelState = require('./DuelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const Spell = require('../classes/spells/spell');
const LatexCorset = require('../restraints/skunk/latexCorset');
const LatexMittens = require('../restraints/skunk/latexMittens');
const LatexHeels = require('../restraints/skunk/latexHeel');
const LatexMuzzle = require('../restraints/skunk/latexMuzzle');

class LatexHugChoiceState extends DuelState{
    getValidActions(){
        return ['status', 'hug'];
    }

    nextState(action, msg, args){
        if (action == 'hug'){
            let location = args[0].toLowerCase();
            let allowed = ['arms', 'legs', 'torso'];
            if(this.difficulty === 'Hard'){
                allowed.push('head');
            }
            if (allowed.includes(location)){
                let difficultyTable = {Easy : 1, Medium : 2, Hard : 3};
                let difficulty = difficultyTable[this.difficulty];
                let restraint = {arms : {restraint : LatexMittens, name : 'Latex Mittens'},
                legs : {restraint : LatexHeels, name : 'Latex Heels'},
                torso : { restraint : LatexCorset, name : 'Latex Corset'},
                head : {restraint : LatexMuzzle, name : 'Latex Muzzle'}};
                let genericSpell = new Spell();
                let enemy = this.enemy;
                let embed = genericSpell.applyGenericBinding(enemy, restraint[location].name, [difficulty], 1, false, restraint[location].restraint);
                msg.channel.send(embed);
                stateFactory.createState('startTurn', this.duel, this.dice);
                return this.duel.state.run(msg);
            }
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid bodypart! ${this.duel.getCurrentPlayer().name} needs to pick a location for a hard binding!`)
                .addField(`Actions available:`, `Pick a binding to place with !hug <location>`)
                .addField(`Available binding locations:`, `${allowed}`)
            msg.channel.send(embed);
        }
    }

    prepare(difficulty, enemy) {
        this.difficulty = difficulty;
        this.enemy = enemy;
    }
}

module.exports = LatexHugChoiceState;
