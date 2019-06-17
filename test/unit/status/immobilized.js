/* global describe, it */
const assert = require('assert');
const Immobilized = require('../../../src/status/immobilized');

describe('Immobilized', function() {
    describe('display', function() {
        it('should return description', () => {
            let immobilized = new Immobilized(1);
            assert.strictEqual(immobilized.display(), 'Must \'stand still\'. If using a melee attack, can only target someone who melee attacked you in the previous turn. May only \'push\' targets with a leash. This overrides Vibrating.');
        });
    });

    describe('canMove', () => {
        it('should be false', () => {
            let immobilized = new Immobilized(1);
            assert(!immobilized.canMove());
        });
    });
});