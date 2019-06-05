const assert = require('assert');
const FullyEvaded = require('../../../src/status/fullyEvaded');

describe('FullyEvaded', function() {
    describe('display', function() {
        it('should return description with restraint', () => {
            let fe = new FullyEvaded();
            assert.strictEqual(fe.display(), "+4 to hit if attacking, -4 to enemy hit if not attacking this round; - Duration : 1 turn");
        });
    });
    
    describe('cooldown', () => {
        it('should end on next turn, as well as update the display', () => {
            let fe = new FullyEvaded(1, 'Latex Mittens');
            let turnOne = fe.cooldown();
            assert(turnOne);
        });
    });

    describe('toHit', () => {
        it('should be +4', () => {
            let fe = new FullyEvaded({effects : []});
            assert.strictEqual(fe.toHit(), 4);
        });
        
        it('should remove itself from the player effects if used', () => {
            let fe = new FullyEvaded({effects : [{name : "Dummy"}]});
            fe.player.effects.push(fe);
            assert.strictEqual(fe.player.effects.length, 2);
            fe.toHit();
            assert.strictEqual(fe.player.effects.length, 1);
            assert.strictEqual(fe.player.effects[0].name, "Dummy");
        });
    });

    describe('toEnemyHit', () => {
        it('should be -4', () => {
            let fe = new FullyEvaded();
            assert.strictEqual(fe.toEnemyHit(), -4);
        });
    });
});