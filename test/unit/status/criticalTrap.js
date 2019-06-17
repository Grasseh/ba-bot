/* global describe, it */
const assert = require('assert');
const CriticalTrap = require('../../../src/status/criticalTrap');

describe('CriticalTrap', function() {
    describe('display', function() {
        it('should return nothing', () => {
            let criticalTrap = new CriticalTrap(1);
            assert.strictEqual(criticalTrap.display(), '');
        });
    });

    describe('triggersCriticalTrap', () => {
        it('should be true', () => {
            let criticalTrap = new CriticalTrap(1);
            assert(criticalTrap.triggersCriticalTrap());
        });
    });

    describe('triggersCriticalTrap', () => {
        it('should expire on next turn', () => {
            let criticalTrap = new CriticalTrap(1);
            let turnOne = criticalTrap.cooldown();
            assert(turnOne);
        });
    });
});