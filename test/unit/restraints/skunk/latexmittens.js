const assert = require('assert');
const Bound = require('../../../../src/status/bound');
const Harnessed = require('../../../../src/status/harnessed');
const Mittened = require('../../../../src/status/mittened');
const LatexMittens = require('../../../../src/restraints/skunk/latexMittens');

describe('Latex Mittens', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let lm = new LatexMittens(1, '');
            assert.strictEqual(lm.getDescription(), "Wrist-length latex gloves -- No Effect");
        });
    });
    
    describe('constructor', () => {
        it('should set no status on easy', () => {
            let lm = new LatexMittens(1, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], []);
        });

        it('should set bound on medium', () => {
            let lm = new LatexMittens(2, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Bound]);
        });

        it('should set harnessed on hard', () => {
            let lm = new LatexMittens(3, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Harnessed]);
        });

        it('should set mittened on extreme + impossible', () => {
            let lm = new LatexMittens(4, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Mittened]);
            lm = new LatexMittens(5, '');
            assert.deepEqual(lm.statusTable[lm.difficulty - 1], [Mittened]);
        });
    });
});