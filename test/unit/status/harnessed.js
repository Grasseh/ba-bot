const assert = require('assert');
const Harnessed = require('../../../src/status/harnessed');

describe('Harnessed', function() {
    describe('display', function() {
        it('should return description', () => {
            let harnessed = new Harnessed(1);
            assert.strictEqual(harnessed.display(), "-4 Non-Spell Hit. -30 to remove gags harder than 'Easy', -4 to leg escape checks");
        });
    });
    
    describe('toNonSpellHit', () => {
        it('should be -4', () => {
            let harnessed = new Harnessed(1);
            assert.strictEqual(harnessed.toNonSpellHit(), -4);
        });
    });

    describe('toEscape', () => {
        it('should be -4 to leg restraints', () => {
            let harnessed = new Harnessed(1, {id : 1});
            assert.strictEqual(harnessed.toEscape({location : 'Legs'}), -4);
        });

        it('should be -30 to head restraints harder than easy', () => {
            let harnessed = new Harnessed(1, {id : 1});
            assert.strictEqual(harnessed.toEscape({location : 'Head', difficulty : 2}), -30);
        });

        it('should be 0 for others', () => {
            let harnessed = new Harnessed(1, {id : 1});
            assert.strictEqual(harnessed.toEscape({location : 'Head', difficulty : 1}), 0);
        });
    })
});