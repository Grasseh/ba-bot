const assert = require('assert');
const Vibrating = require('../../../src/status/vibrating');

describe('Vibrating', function() {
    describe('display', function() {
        it('should return description', () => {
            let vibrating = new Vibrating(1);
            assert.strictEqual(vibrating.display(), "Cannot 'stand still'. If also Immobilized, -2 on all Escape rolls.");
        });
    });
    
    describe('canStand', () => {
        it('should be false', () => {
            let vibrating = new Vibrating(1);
            assert(!vibrating.canStand());
        });
    });

    describe('toEscape', () => {
        it('should be -2 if user is immobilized', () => {
            let vibrating = new Vibrating(1, {player : { effects : [{canMove : () => false}]}});
            assert.strictEqual(vibrating.toEscape({location : 'Legs', difficulty : 2}), -2);
        });

        it('should be -2 if user is immobilized', () => {
            let vibrating = new Vibrating(1, {player : { effects : [{canMove : () => true}]}});
            assert.strictEqual(vibrating.toEscape({location : 'Legs', difficulty : 2}), 0);
        });
    })
});