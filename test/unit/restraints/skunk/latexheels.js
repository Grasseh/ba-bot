/* global describe, it */
const assert = require('assert');
const Encumbered = require('../../../../src/status/encumbered');
const Hobbled = require('../../../../src/status/hobbled');
const Incapacitated = require('../../../../src/status/incapacitated');
const LatexHeels = require('../../../../src/restraints/skunk/latexHeel');

describe('Latex Heels', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let lh = new LatexHeels(1, '');
            assert.strictEqual(lh.getDescription(), 'Ankle-high short heels -- No Effect');
        });
    });

    describe('constructor', () => {
        it('should set no status on easy', () => {
            let lh = new LatexHeels(1, '');
            assert.deepEqual(lh.statusTable[lh.difficulty - 1], []);
        });

        it('should set encumbered on medium', () => {
            let lh = new LatexHeels(2, '');
            assert.deepEqual(lh.statusTable[lh.difficulty - 1], [Encumbered]);
        });

        it('should set hobbled on hard', () => {
            let lh = new LatexHeels(3, '');
            assert.deepEqual(lh.statusTable[lh.difficulty - 1], [Hobbled]);
        });

        it('should set incapacitated on extreme + impossible', () => {
            let lh = new LatexHeels(4, '');
            assert.deepEqual(lh.statusTable[lh.difficulty - 1], [Incapacitated]);
            lh = new LatexHeels(5, '');
            assert.deepEqual(lh.statusTable[lh.difficulty - 1], [Incapacitated]);
        });
    });
});