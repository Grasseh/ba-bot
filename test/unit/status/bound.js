const assert = require('assert');
const Bound = require('../../../src/status/bound');

describe('Bound', function() {
    describe('display', function() {
        it('should return description', () => {
            let bound = new Bound(1);
            assert.strictEqual(bound.display(), "-2 Non-Spell Hit");
        });
    });
    
    describe('ToNonSpellHit', () => {
        it('should be -2', () => {
            let bound = new Bound(1);
            assert.strictEqual(bound.toNonSpellHit(), -2);
        });
    });
});