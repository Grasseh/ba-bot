const assert = require('assert');
const TrapAttackAvailable = require('../../../src/status/trapAttackAvailable');

describe('TrapAttackAvailable', function() {
    describe('display', function() {
        it('should return description', () => {
            let taa = new TrapAttackAvailable();
            assert.strictEqual(taa.display(), "Can use a trap attack this turn");
        });
    });
    
    describe('cooldown', () => {
        it('should end on next turn', () => {
            let taa = new TrapAttackAvailable(1);
            let turnOne = taa.cooldown();
            let turnTwo = taa.cooldownOther();
            assert(!turnOne);
            assert(turnTwo);
        });
    });

    describe('isTrapAttackAvailable', () => {
        it('should be true', () => {
            let taa = new TrapAttackAvailable();
            assert(taa.isTrapAttackAvailable());
        });
    });
});