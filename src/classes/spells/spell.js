const embedUtils = require('../../utils/embeds');

class Spell{
    constructor(){
        this.melee = false;
        this.spell = false;
        this.ultimate = false;
        this.used = false;
        this.name = 'Generic Spell';
    }

    toHit(){
        return 0;
    }

    applyGenericBinding(enemy, spellName, effectTable, effectRoll, crit, Restraint){
        let embed = embedUtils.getCombatEmbed();
        embed.setDescription(`${enemy.name} has been hit by ${spellName}!`);
        let existingRestraint = enemy.getRestraints().filter(r => r.getName() === spellName);
        let appliedRestraint;
        let difficulty = effectTable[effectRoll - 1];
        difficulty += crit ? 1 : 0;
        if(existingRestraint.length > 0){
            appliedRestraint = existingRestraint[0];
            appliedRestraint.difficulty += difficulty;
            if(appliedRestraint.difficulty > 5)
                appliedRestraint.setDifficulty(5);
            difficulty = appliedRestraint.difficulty;
            //Remove active effects
            enemy.effects = enemy.effects.filter(e => e.binding !== appliedRestraint.id);
        }
        else{
            appliedRestraint = new Restraint(difficulty, enemy);
            enemy.addRestraint(appliedRestraint);
        }
        let addedEffects = '';
        for(let StatusEffect of appliedRestraint.statusTable[difficulty - 1]){
            let effect = new StatusEffect(appliedRestraint.id, appliedRestraint);
            enemy.addEffect(effect);
            addedEffects += `${enemy.name} is now ${effect.name}!\n`;
        }
        if(addedEffects !== '')
            embed.addField('Effects:', addedEffects);
        embed.addField('Difficulty:', appliedRestraint.getDifficulty());
        embed.addField('Description:', appliedRestraint.getDescription());
        return embed;
    }

    getGenericEffectTable(){
        /* 1-6 -> Easy, 7-12 -> Medium, 13-19 -> Hard, 20 -> Extreme */
        return [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4];
    }

    isSpell(){
        return this.spell;
    }

    isMelee(){
        return this.melee;
    }

    isUltimate(){
        return this.ultimate;
    }

    cast(opts){}
}

module.exports = Spell;