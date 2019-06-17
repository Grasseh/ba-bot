/* global describe, it */
const assert = require('assert');
const Status = require('../../../src/status/status');

describe('Status', function() {
    describe('display', function() {
        it('should return generic description', () => {
            let status = new Status();
            assert.strictEqual(status.display(), 'Generic Effect');
        });
    });

    describe('getName', () => {
        it('should be generic', () => {
            let status = new Status(1);
            assert.strictEqual(status.getName(), 'Generic Status');
        });
    });

    describe('cooldown', () => {
        it('should not be deleted by default on turn change', () => {
            let status = new Status(1);
            let turnOne = status.cooldown();
            assert(!turnOne);
        });
    });

    describe('cooldownOther', () => {
        it('should not be deleted by default on turn change', () => {
            let status = new Status(1);
            let turnOne = status.cooldownOther();
            assert(!turnOne);
        });
    });

    describe('toHit', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toHit(), 0);
        });
    });

    describe('toHit', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toEnemyHit(), 0);
        });
    });

    describe('toTraps', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toTraps(), 0);
        });
    });

    describe('toSpellHit', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toSpellHit(), 0);
        });
    });

    describe('toNonSpellHit', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toNonSpellHit(), 0);
        });
    });

    describe('toEscape', () => {
        it('should be 0 by default', () => {
            let status = new Status(1);
            assert.strictEqual(status.toEscape(), 0);
        });
    });

    describe('triggersCriticalTrap', () => {
        it('should be false by default', () => {
            let status = new Status(1);
            assert(!status.triggersCriticalTrap());
        });
    });

    describe('isTrapAttackAvailable', () => {
        it('should be false by default', () => {
            let status = new Status(1);
            assert(!status.isTrapAttackAvailable());
        });
    });

    describe('onFailedEscape', () => {
        it('should have no default behavior', () => {
            let status = new Status(1);
            let res = status.onFailedEscape();
            assert.strictEqual(res, undefined);
        });
    });

    describe('canStand', () => {
        it('should be true by default', () => {
            let status = new Status(1);
            assert(status.canStand());
        });
    });

    describe('canMove', () => {
        it('should be true by default', () => {
            let status = new Status(1);
            assert(status.canMove());
        });
    });

    describe('isCollared', () => {
        it('should be false by default', () => {
            let status = new Status(1);
            assert(!status.isCollared());
        });
    });
});