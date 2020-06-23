const Status = require('./status');
const EscapeClass = require('../services/escape');
const embedUtils = require('../utils/embeds');

class RegeneratingLatex extends Status{
    constructor(binding){
        super();
        this.name = 'Regenerating Latex';
        // Note: This is dumb if more than one players plays this class
        // Latex bondage means any restraint starting with 'Latex'
        this.effect = 'Passive : Every two turns, all loosened latex bondage heals one tier, up to original level.';
        this.time = 0;
        this.binding = binding;
        this.escapeClass = new EscapeClass();
    }

    cooldown(players, msg){
        this.time++;

        if(this.time % 2 === 0) {
            players.forEach(player => {
                player.restraints.forEach(restraint => {
                    if(
                        restraint.difficulty < restraint.highestDifficulty &&
                        restraint.name.slice(0, 5) === 'Latex'
                    ) {
                        let embed = embedUtils.getCombatEmbed();
                        embed.setDescription(`${player.name}'s latex restraints are regenerating!`);
                        msg.channel.send(embed);
                        this.escapeClass.increaseDifficulty(restraint, player, msg, 1);
                    }
                });
            });
        }
        return false;
    }

}

module.exports = RegeneratingLatex;