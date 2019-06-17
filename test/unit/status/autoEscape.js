/* global describe, it */
const assert = require('assert');
const AutoEscape = require('../../../src/status/autoEscape');

describe('AutoEscape', function() {
    describe('display', function() {
        it('should return description with restraint', () => {
            let ae = new AutoEscape(1, 'Latex Mittens');
            assert.strictEqual(ae.display(), 'On next turn, can escape Latex Mittens if they were not tightened.');
        });
    });

    describe('cooldownOther', () => {
        it('should end on other player\'s second next turn', () => {
            let ae = new AutoEscape(1, 'Latex Mittens');
            let turnOne = ae.cooldownOther();
            let turnTwo = ae.cooldownOther();
            assert(!turnOne);
            assert(turnTwo);
        });
    });
});