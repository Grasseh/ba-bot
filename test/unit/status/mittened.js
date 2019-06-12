const assert = require('assert');
const Mittened = require('../../../src/status/mittened');

describe('Mittened', function() {
    describe('display', function() {
        it('should return description', () => {
            let mittened = new Mittened(1);
            assert.strictEqual(mittened.display(), "-30 Non-Spell Hit, -30 to escape gags and legs harder than easy.");
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

        it('should be 0 for others', () => {
            let mittened = new Mittened(1, {id : 1});
            assert.strictEqual(mittened.toEscape({location : 'Head', difficulty : 1}), 0);
            assert.strictEqual(mittened.toEscape({location : 'Legs', difficulty : 1}), 0);
            assert.strictEqual(mittened.toEscape({location : 'Arms', difficulty : 4}), 0);
        });
    })
});