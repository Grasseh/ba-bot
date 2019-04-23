const playerClass = require('./playerClass');
const state = require('../state');
const LatexMuzzle = require('../restraints/latexMuzzle');
const Blinded = require('../status/blinded');
const Gagged = require('../status/gagged');
const Hooded = require('../status/hooded');
const Discord = require('discord.js');

class SkunkWarlock extends playerClass{
    constructor(){
        super();
        this.spells = {
            'muzzle' : this.muzzle.bind(this),
        }
    }

    getClassName(){
        return "Skunk Warlock";
    }

    castSpell(spellName, effectRoll, self, enemy, crit = false){
        return this.spells[spellName](effectRoll, self, enemy, crit);
    }

    /*
    Summon Latex Muzzle
    Form a latex muzzle on your target!

    Type: Spell Target: Head

    Roll	Effect Level	Statuses	     Description
    1-6     Easy            Gagged           Latex ball fills the mouth.
    7-12    Medium	        Gagged	         Latex spreads to form a half-mask over the ballgag.
    13-19   Hard	        Gagged  Blinded	 The latex becomes a full-face mask with a cute snout.
    20      Extreme	        Hooded	         Latex spreads over the whole head in a hood, forming a skunk muzzle.
    */
    muzzle(effectRoll, self, enemy, crit){
        let embed = new Discord.RichEmbed()
            .setAuthor('Bondage Arena Duel!', state.getState().bot.user.displayAvatarURL)
            .setColor(0x0000AA)
            .setDescription(`${enemy.name} has been hit by Latex Muzzle!`);
        let muzzle = enemy.getRestraints().filter(r => {return r.getName() == "Latex Muzzle"});
        let difficultyTable = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,4];
        let difficulty = difficultyTable[effectRoll - 1];
        difficulty += crit ? 1 : 0;
        if(muzzle.length > 0){
            muzzle = muzzle[0];
            muzzle.difficulty += difficulty;
            if(muzzle.difficulty > 5)
                muzzle.difficulty = 5;
            //Remove muzzle effects
            enemy.effects = enemy.effects.filter(e => e.binding !== muzzle.id)
        }
        else{
            muzzle = new LatexMuzzle(difficulty);
            enemy.addRestraint(muzzle);
        }
        let addedEffects = '';
        if(muzzle.difficulty <= 3){
            enemy.addEffect(new Gagged(muzzle.id));
            addedEffects += `${enemy.name} is now Gagged!\n`;
        }
        if(muzzle.difficulty == 3){
            enemy.addEffect(new Blinded(muzzle.id));
            addedEffects += `${enemy.name} is now Blinded!\n`;
        }
        if(muzzle.difficulty >= 4){
            enemy.addEffect(new Hooded(muzzle.id));
            addedEffects += `${enemy.name} is now Hooded!\n`;
        }
        embed.addField(`Effects:`, addedEffects);
        embed.addField(`Difficulty:`, muzzle.getDifficulty());
        embed.addField(`Description:`, muzzle.getDescription());
        return embed;
    }

    getSpellList(){
        return Object.keys(this.spells);
    }
}

module.exports = SkunkWarlock;