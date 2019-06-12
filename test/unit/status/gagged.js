const assert = require('assert');
const Gagged = require('../../../src/status/gagged');

describe('Gagged', function() {
    describe('display', function() {
        it('should return description', () => {
            let gagged = new Gagged(1);
            assert.strictEqual(gagged.display(), "-30 to Spell Attacks");
        });
    });
    
    describe('toSpellHit', () => {
        it('should be -30', () => {
            let gagged = new Gagged(1);
            assert.strictEqual(gagged.toSpellHit(), -30);
        });
    });
});