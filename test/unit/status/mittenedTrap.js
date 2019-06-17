/* global describe, it */
const assert = require('assert');
const Mittened = require('../../../src/status/mittenedTrap');

describe('Mittened Trap', function() {
    describe('display', function() {
        it('should return description', () => {
            let mittened = new Mittened(1);
            assert.strictEqual(mittened.display(), '-30 Non-Spell Hit, -30 to escape gags and legs harder than easy, -30 to escape arm restraints that aren\'t causing this status.');
        });
    });

    describe('toNonSpellHit', () => {
        it('should be -30', () => {
            let mittened = new Mittened(1);
            assert.strictEqual(mittened.toNonSpellHit(), -30);
        });
    });

    describe('toEscape', () => {
        it('should be -30 to leg restraints harder than easy', () => {
            let mittened = new Mittened(1, {id : 1});
            assert.strictEqual(mittened.toEscape({location : 'Legs', difficulty : 2}), -30);
        });

        it('should be -30 to head restraints harder than easy', () => {
            let mittened = new Mittened(1, {id : 1});
            assert.strictEqual(mittened.toEscape({location : 'Head', difficulty : 2}), -30);
        });

        it('should be -30 to arm restraints other than this one', () => {
            let mittened = new Mittened(1, {id : 1});
            assert.strictEqual(mittened.toEscape({location : 'Arms', id : 2}), -30);
        });

        it('should be 0 for others', () => {
            let mittened = new Mittened(1, {id : 1});
            assert.strictEqual(mittened.toEscape({location : 'Head', difficulty : 1}), 0);
            assert.strictEqual(mittened.toEscape({location : 'Legs', difficulty : 1}), 0);
            assert.strictEqual(mittened.toEscape({location : 'Arms', id : 1, difficulty : 4}), 0);
        });
    });
});