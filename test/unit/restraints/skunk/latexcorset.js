const assert = require('assert');
const LatexCorset = require('../../../../src/restraints/skunk/latexCorset');
const Cinched = require('../../../../src/status/cinched');
const Constricted = require('../../../../src/status/constricted');
const Breathless = require('../../../../src/status/breathless');
const Clumsy = require('../../../../src/status/clumsy');
const Stumbling = require('../../../../src/status/stumbling');
const Dizzy = require('../../../../src/status/dizzy');
const Vibrating = require('../../../../src/status/vibrating');

describe('Latex Corset', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let lc = new LatexCorset(1, '');
            assert.strictEqual(lc.getDescription(), "Simple flexible latex waist cincher -- No Effect");
        });
    });
    
    describe('constructor', () => {
        it('should set no status on easy', () => {
            let lc = new LatexCorset(1, '');
            assert.deepEqual(lc.statusTable[lc.difficulty - 1], []);
        });

        it('should set cinched, clumsy on medium', () => {
            let lc = new LatexCorset(2, '');
            assert.deepEqual(lc.statusTable[lc.difficulty - 1], [Clumsy, Cinched]);
        });

        it('should set constricted, stumbling, vibrating on hard', () => {
            let lc = new LatexCorset(3, '');
            assert.deepEqual(lc.statusTable[lc.difficulty - 1], [Constricted, Stumbling, Vibrating]);
        });

        it('should set breathless, dizzy, vibrating on extreme + impossible', () => {
            let lc = new LatexCorset(4, '');
            assert.deepEqual(lc.statusTable[lc.difficulty - 1], [Breathless, Dizzy, Vibrating]);
            lc = new LatexCorset(5, '');
            assert.deepEqual(lc.statusTable[lc.difficulty - 1], [Breathless, Dizzy, Vibrating]);
        });
    });
});