const assert = require('assert');
const Incapacitated = require('../../../src/status/incapacitated');

describe('Incapacitated', function() {
    describe('display', function() {
        it('should return description', () => {
            let incapacitated = new Incapacitated(1);
            assert.strictEqual(incapacitated.display(), "-3 Traps, +6 Enemy Hit");
        });
    });
    
    describe('toTraps', () => {
        it('should be -3', () => {
            let incapacitated = new Incapacitated(1);
            assert.strictEqual(incapacitated.toTraps(), -3);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +6', () => {
            let incapacitated = new Incapacitated(1);
            assert.strictEqual(incapacitated.toEnemyHit(), 6);
        });
    });
});