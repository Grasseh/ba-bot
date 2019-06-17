const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const Spell = require('../classes/spells/spell');
const RubberHood = require('../restraints/rubber/rubberHood');
const RubberJacket = require('../restraints/rubber/rubberJacket');
const RubberHobble = require('../restraints/rubber/rubberHobble');

class RubberBallChoiceState extends DuelState{
    getValidActions(){
        return ['status', 'cancel', 'bind'];
    }

    nextState(action, msg, args){
        if (action === 'bind'){
            let location = args[0].toLowerCase();
            let allowed = ['arms', 'legs', 'head', 'random'];
            if (allowed.includes(location)){
                if(location !== 'random'){
                    let restraint = {
                        head: { restraint: RubberHood, name: 'Rubber Hood' },
                        legs: { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
                        arms: { restraint: RubberJacket, name: 'Rubber Straitjacket' }
                    };
                    let genericSpell = new Spell();
                    let enemy = this.enemy;
                    let embed = genericSpell.applyGenericBinding(enemy, restraint[location].name, [1], 1, false, restraint[location].restraint);
                    this.hitCount -= 2;
                    msg.channel.send(embed);
                }
                //If all applied
                return this.run(msg, location === 'random');
            }
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription(`Invalid location! ${this.duel.getCurrentPlayer().name} needs to pick a hit location!`)
                .addField('Actions available:', 'Sacrifice two hits to pick a binding to place with `!bind <location>`, or use all remaining hits randomly with `!bind random`.')
                .addField('Available binding locations:', `${allowed}`)
                .addField('Hit Count remaining:', `${this.hitCount}`);
            msg.channel.send(embed);
        }
    }

    run(msg, isRandom){
        if(isRandom || this.hitCount <= 1){
            while(this.hitCount > 0){
                let roll = this.dice.xDy(1, 6).sum;
                let embed = embedUtils.getCombatEmbed()
                    .setDescription(`Location roll for ${this.duel.getCurrentPlayer().name} using Rubber Ball!`)
                    .addField('d6', `${roll}`);
                msg.channel.send(embed);
                let effectTable = [null, 0, 1, 1, 1, 2, 2];
                let restraint = [
                    { restraint: RubberHood, name: 'Rubber Hood' },
                    { restraint: RubberJacket, name: 'Rubber Straitjacket' },
                    { restraint: RubberHobble, name: 'Rubber Hobble Dress' },
                ];
                let genericSpell = new Spell();
                let enemy = this.enemy;
                embed = genericSpell.applyGenericBinding(enemy, restraint[effectTable[roll]].name, [1], 1, false, restraint[effectTable[roll]].restraint);
                msg.channel.send(embed);
                this.hitCount--;
            }
            stateFactory.createState('startTurn', this.duel, this.dice);
            return this.duel.state.run(msg);
        }
        let allowed = ['arms', 'legs', 'head', 'random'];
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`Rubber Ball! ${this.duel.getCurrentPlayer().name} needs to pick a hit location!`)
            .addField('Actions available:', 'Sacrifice two hits to pick a binding to place with `!bind <location>`, or use all remaining hits randomly with `!bind random`.')
            .addField('Available binding locations:', `${allowed}`)
            .addField('Hit Count remaining:', `${this.hitCount}`);
        msg.channel.send(embed);
    }

    prepare(hitCount, enemy) {
        this.hitCount = hitCount;
        this.enemy = enemy;
    }
}

module.exports = RubberBallChoiceState;