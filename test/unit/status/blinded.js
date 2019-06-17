/* global describe, it */
const assert = require('assert');
const Blinded = require('../../../src/status/blinded');

describe('Blinded', function() {
    describe('display', function() {
        it('should return description', () => {
            let blinded = new Blinded(1);
            assert.strictEqual(blinded.display(), '-3 Traps, -3 Hit, +3 Enemy Hit');
        });
    });

    describe('ToHit', () => {
        it('should be -3', () => {
            let blinded = new Blinded(1);
            assert.strictEqual(blinded.toHit(), -3);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +3', () => {
            let blinded = new Blinded(1);
            assert.strictEqual(blinded.toEnemyHit(), 3);
        });
    });

    describe('toTraps', () => {
        it('should be -3', () => {
            let blinded = new Blinded(1);
            assert.strictEqual(blinded.toTraps(), -3);
        });
    });
});