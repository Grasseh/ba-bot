/* global describe, it */
const assert = require('assert');
const Constricted = require('../../../src/status/constricted');

describe('Constricted', function() {
    describe('display', function() {
        it('should return description', () => {
            let constricted = new Constricted(1);
            assert.strictEqual(constricted.display(), '+2 Enemy Hit');
        });
    });

    describe('toEnemyHit', () => {
        it('should be +2', () => {
            let constricted = new Constricted(1);
            assert.strictEqual(constricted.toEnemyHit(), 2);
        });
    });
});