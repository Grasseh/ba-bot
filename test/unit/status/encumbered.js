const assert = require('assert');
const Encumbered = require('../../../src/status/encumbered');

describe('Encumbered', function() {
    describe('display', function() {
        it('should return description', () => {
            let encumbered = new Encumbered(1);
            assert.strictEqual(encumbered.display(), "-1 Traps, +2 Enemy Hit");
        });
    });
    
    describe('toTraps', () => {
        it('should be -1', () => {
            let encumbered = new Encumbered(1);
            assert.strictEqual(encumbered.toTraps(), -1);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +2', () => {
            let encumbered = new Encumbered(1);
            assert.strictEqual(encumbered.toEnemyHit(), 2);
        });
    });
});