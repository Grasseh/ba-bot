const assert = require('assert');
const ChastityBelt = require('../../../../src/restraints/traps/chastityBelt');
const Vibrating = require('../../../../src/status/vibrating');
const ChastityMedium = require('../../../../src/status/chastityMedium');
const ChastityHard = require('../../../../src/status/chastityHard');
const ChastityExtreme = require('../../../../src/status/chastityExtreme');

describe('Chastity Belt', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let cb = new ChastityBelt(1, '');
            assert.strictEqual(cb.getDescription(), "A nice buckled leather chastity belt slides around your hips -- No effect");
        });
    });
    
    describe('constructor', () => {
        it('should set no status on easy', () => {
            let cb = new ChastityBelt(1, '');
            assert.deepEqual(cb.statusTable[cb.difficulty - 1], []);
        });

        it('should set chastityMed, vibrating on medium', () => {
            let cb = new ChastityBelt(2, '');
            assert.deepEqual(cb.statusTable[cb.difficulty - 1], [Vibrating, ChastityMedium]);
        });

        it('should set chastityHard and Vibrating on hard', () => {
            let cb = new ChastityBelt(3, '');
            assert.deepEqual(cb.statusTable[cb.difficulty - 1], [Vibrating, ChastityHard]);
        });

        it('should set chastityExtreme, vibrating on extreme + impossible', () => {
            let cb = new ChastityBelt(4, '');
            assert.deepEqual(cb.statusTable[cb.difficulty - 1], [Vibrating, ChastityExtreme]);
            cb = new ChastityBelt(5, '');
            assert.deepEqual(cb.statusTable[cb.difficulty - 1], [Vibrating, ChastityExtreme]);
        });
    });
});