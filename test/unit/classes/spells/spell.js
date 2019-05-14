/* global describe, it */
const assert = require('assert');
const Spell = require('../../../../src/classes/spells/spell');
const sinon = require('sinon');

describe('toHit', () => {
    it('should not affect to hit chance', () => {
        let spell = new Spell();
        assert.strictEqual(spell.toHit(), 0);
    });
})

describe('getGenericEffectTable', () => {
    it('should return 1-6 easy, 7-12 medium, 13-19 hard, 20 extreme', () => {
        let spell = new Spell();
        assert.deepEqual(spell.getGenericEffectTable(), [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,4]);
    });
})

describe('isMelee', () => {
    it('should not generically be melee', () => {
        let spell = new Spell();
        assert.strictEqual(spell.isMelee(), false);
    });
});

describe('isSpell', () => {
    it('should not generically be a spell', () => {
        let spell = new Spell();
        assert.strictEqual(spell.isSpell(), false);
    });
});
describe('isUltimate', () => {
    it('should not generically be ultimate', () => {
        let spell = new Spell();
        assert.strictEqual(spell.isUltimate(), false);
    });
});

describe('applyGenericBinding', () => {
    class GenericRestraint{
        constructor(difficulty){
            this.name = "Generic Restraint";
            this.id = '1';
            this.statusTable = [[], [GenericEffectOne], [GenericEffectOne], [GenericEffectTwo], [GenericEffectOne, GenericEffectTwo]];
            this.difficulty = difficulty;
        }

        getDifficulty(){
            return this.difficulty;
        }

        getDescription(){
            return "Generic Description";
        }

        getName(){
            return this.name;
        }
    }

    class GenericEffectOne{
        constructor(){
            this.name = "Effected";
            this.binding = '1';
        }
    }

    class GenericEffectTwo{
        constructor(){
            this.name = "Afflicted";
            this.binding = '1';
        }
    }

    it('should apply any binding passed, with the provided difficulty, and apply no effects if there\'s none.', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 3], 1, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.deepEqual(genericEnemy.effects, []);
    });

    it('should apply any binding passed, with the provided difficulty, and apply its effect.', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 3], 2, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
    });
    
    it('should replace an existing binding and increase its effect.', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 3], 2, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 3], 2, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Afflicted');
    });

    it('should set 2 effects.', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 5], 3, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
        assert.strictEqual(genericEnemy.effects[1].name, 'Afflicted');
    });

    it('should cap at impossible.', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 4], 3, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Afflicted');
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 2, 5], 2, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
        assert.strictEqual(genericEnemy.effects[1].name, 'Afflicted');
    });

    it('should not remove other effects', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 3, 4], 2, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
        spell.applyGenericBinding(genericEnemy, 'Generic Restraints', [1, 2, 4], 1, false, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.restraints[1].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Effected');
    })

    it('should one up on crits', () => {
        let spell = new Spell();
        let genericEnemy = {
            name: 'Erika',
            restraints: [],
            effects: [],
            addRestraint: sinon.stub().callsFake(r => genericEnemy.restraints.push(r)),
            addEffect: sinon.stub().callsFake(e => genericEnemy.effects.push(e)),
            getRestraints : sinon.stub().callsFake(() => genericEnemy.restraints)
        };
        spell.applyGenericBinding(genericEnemy, 'Generic Restraint', [1, 3, 5], 2, true, GenericRestraint);
        assert.strictEqual(genericEnemy.restraints[0].name, 'Generic Restraint');
        assert.strictEqual(genericEnemy.effects[0].name, 'Afflicted');
    })
});