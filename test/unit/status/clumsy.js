/* global describe, it */
const assert = require('assert');
const Clumsy = require('../../../src/status/clumsy');

describe('Clumsy', function() {
    describe('display', function() {
        it('should return description', () => {
            let clumsy = new Clumsy(1);
            assert.strictEqual(clumsy.display(), '-1 Traps');
        });
    });

    describe('toTraps', () => {
        it('should be -1', () => {
            let clumsy = new Clumsy(1);
            assert.strictEqual(clumsy.toTraps(), -1);
        });
    });
});