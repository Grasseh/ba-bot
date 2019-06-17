/* global describe, it */
const assert = require('assert');
const Stumbling = require('../../../src/status/stumbling');

describe('Stumbling', function() {
    describe('display', function() {
        it('should return description', () => {
            let stumbling = new Stumbling(1);
            assert.strictEqual(stumbling.display(), '-2 Traps');
        });
    });

    describe('toTraps', () => {
        it('should be -2', () => {
            let stumbling = new Stumbling(1);
            assert.strictEqual(stumbling.toTraps(), -2);
        });
    });
});