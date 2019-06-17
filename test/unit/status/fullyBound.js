/* global describe, it */
const assert = require('assert');
const FullyBound = require('../../../src/status/fullyBound');

describe('FullyBound', function() {
    describe('display', function() {
        it('should return description with restraint', () => {
            let fb = new FullyBound();
            assert.strictEqual(fb.display(), ' This player has Extreme bindings on Arms, Legs and Head. - Time before opponent wins : 2 turns');
        });
    });

    describe('cooldownOther', () => {
        it('should end on other player\'s second next turn, as well as update the display', () => {
            let fb = new FullyBound(1, 'Latex Mittens');
            let turnOne = fb.cooldownOther();
            assert.strictEqual(fb.display(), ' This player has Extreme bindings on Arms, Legs and Head. - Time before opponent wins : 1 turn');
            let turnTwo = fb.cooldownOther();
            assert.strictEqual(fb.display(), ' This player has Extreme bindings on Arms, Legs and Head. - Time before opponent wins : 0 turns');
            assert(!turnOne);
            assert(!turnTwo);
        });
    });
});