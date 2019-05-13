const DuelState = require('./duelState');
const stateFactory = require('./stateFactory');
const embedUtils = require('../utils/embeds');
const LatexSkunk = require('../classes/skunk');
const RubberMage = require('../classes/rubbermage');

class PickClassState extends DuelState{
    getValidActions(){
        return ['status', 'cancel', 'class'];
    }

    run(msg){
        let players = this.duel.getPlayersWithoutClass();
        let classes = this.getPlayableClasses();
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`Class selection!`)
            .addField(`Pick a class!`, `To select your class, use \`!class <classname>\`.`)
            .addField(`Available classes`, Object.keys(classes).join(', '))
            .addField(`Players without classes`, players.map(p => p.name));
        msg.channel.send(embed);
    }

    nextState(action, msg, args) {
        let players = this.duel.getPlayersWithoutClass();
        let classes = this.getPlayableClasses();
        let selectedClass = args[0];
        let player = players.filter(p => p.name === `<@${msg.author.id.replace('!','')}>`);
        if(player.length !== 1){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription('You cannot currently use this command')
            msg.channel.send(embed);
            return;
        }
        if(!Object.keys(classes).includes(selectedClass)){
            let embed = embedUtils.getPlayerErrorEmbed()
                .setDescription('Invalid class.')
                .addField(`Available classes`, Object.keys(classes).join(', '))
            msg.channel.send(embed);
            return;
        }
        player = player[0];
        player.class = new (classes[selectedClass])();
        let embed = embedUtils.getPlayerActionEmbed()
            .setDescription(`${player.name} is now a ${player.class.getClassName()}!`);
        msg.channel.send(embed);
        if(players.length === 1){
            stateFactory.createState('initiative', this.duel, this.dice);
            this.duel.state.run(msg);
        }
    }

    getPlayableClasses(){
        return {
            latexskunk : LatexSkunk,
            rubbermage : RubberMage
        }
    }
}

module.exports = PickClassState;
