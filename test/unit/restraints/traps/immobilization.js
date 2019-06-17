/* global describe, it */
const assert = require('assert');
const ImmobilizationTrap = require('../../../../src/restraints/traps/immobilization');
const Immobilized = require('../../../../src/status/immobilized');
const Encumbered = require('../../../../src/status/encumbered');
const Hobbled = require('../../../../src/status/hobbled');
const Incapacitated = require('../../../../src/status/incapacitated');

describe('Immobilization Trap', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let imt = new ImmobilizationTrap(1, '');
            assert.strictEqual(imt.getDescription(), 'Buckled leather cuffs bind your ankles to the floor -- Immobilized');
        });
    });

    describe('constructor', () => {
        it('should set immobilized on easy', () => {
            let imt = new ImmobilizationTrap(1, '');
            assert.deepEqual(imt.statusTable[imt.difficulty - 1], [Immobilized]);
        });

        it('should set immobilized, encumbred on medium', () => {
            let imt = new ImmobilizationTrap(2, '');
            assert.deepEqual(imt.statusTable[imt.difficulty - 1], [Immobilized, Encumbered]);
        });

        it('should set Immobilized, Hobbled on hard', () => {
            let imt = new ImmobilizationTrap(3, '');
            assert.deepEqual(imt.statusTable[imt.difficulty - 1], [Immobilized, Hobbled]);
        });

        it('should set immobilized, incapacitated on extreme + impossible', () => {
            let imt = new ImmobilizationTrap(4, '');
            assert.deepEqual(imt.statusTable[imt.difficulty - 1], [Immobilized, Incapacitated]);
            imt = new ImmobilizationTrap(5, '');
            assert.deepEqual(imt.statusTable[imt.difficulty - 1], [Immobilized, Incapacitated]);
        });
    });
});