const assert = require('assert');
const Hooded = require('../../../src/status/hooded');

describe('Hooded', function() {
    describe('display', function() {
        it('should return description', () => {
            let hooded = new Hooded(1);
            assert.strictEqual(hooded.display(), "-3 Traps, -3 Hit, +5 Enemy Hit, -30 to Spell Attacks");
        });
    });
    
    describe('toTraps', () => {
        it('should be -3', () => {
            let hooded = new Hooded(1);
            assert.strictEqual(hooded.toTraps(), -3);
        });
    });

    describe('toHit', () => {
        it('should be -3', () => {
            let hooded = new Hooded(1);
            assert.strictEqual(hooded.toHit(), -3);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +5', () => {
            let hooded = new Hooded(1);
            assert.strictEqual(hooded.toEnemyHit(), 5);
        });
    });

    describe('toSpellAttacks', () => {
        it('should be -30', () => {
            let hooded = new Hooded(1);
            assert.strictEqual(hooded.toSpellHit(), -30);
        });
    });
});