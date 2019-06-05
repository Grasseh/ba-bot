const assert = require('assert');
const Blinded = require('../../../../src/status/blinded');
const Gagged = require('../../../../src/status/gagged');
const Hooded = require('../../../../src/status/hooded');
const LatexMuzzle = require('../../../../src/restraints/skunk/latexMuzzle');

describe('Latex Muzzle', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let lm = new LatexMuzzle(1, '');
            assert.strictEqual(lm.getDescription(), "Latex ball fills the mouth. -- Gagged");
        });
    });
    
    describe('constructor', () => {
        it('should set gagged on easy and medium', () => {
            let lm = new LatexMuzzle(1, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Gagged]);
            lm = new LatexMuzzle(2, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Gagged]);
        });

        it('should set gagged + blind on hard', () => {
            let lm = new LatexMuzzle(3, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Gagged, Blinded]);
        });

        it('should set hooded on extreme + impossible', () => {
            let lm = new LatexMuzzle(4, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Hooded]);
            lm = new LatexMuzzle(5, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Hooded]);
        });
    });
});