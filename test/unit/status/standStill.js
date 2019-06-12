const assert = require('assert');
const StandStill = require('../../../src/status/standStill');

describe('StandStill', function() {
    describe('display', function() {
        it('should return description', () => {
            let ss = new StandStill();
            assert.strictEqual(ss.display(), " +4 to Enemy Hit, +2 to all Escape Rolls - Duration : 1 turn");
        });
    });
    
    describe('cooldown', () => {
        it('should end on next turn', () => {
            let ss = new StandStill(1);
            let turnOne = ss.cooldown();
            assert(turnOne);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +4', () => {
            let ss = new StandStill({efsscts : []});
            assert.strictEqual(ss.toEnemyHit(), 4);
        });
    });

    describe('toEscape', () => {
        it('should be +2', () => {
            let ss = new StandStill();
            assert.strictEqual(ss.toEscape(), 2);
        });
    });
});