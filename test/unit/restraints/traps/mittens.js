const assert = require('assert');
const Mittens = require('../../../../src/restraints/traps/mittens');
const MittenedTrap = require('../../../../src/status/mittenedTrap');

describe('Mittens', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let mit = new Mittens(1, '');
            assert.strictEqual(mit.getDescription(), "Simple mittens make it impossible to properly grasp a weapon! -- Mittened");
        });
    });
    
    describe('constructor', () => {
        it('should set mittened on easy', () => {
            let mit = new Mittens(1, '');
            assert.deepEqual(mit.statusTable[mit.difficulty - 1], [MittenedTrap]);
        });

        it('should set immobilized, encumbred on medium', () => {
            let mit = new Mittens(2, '');
            assert.deepEqual(mit.statusTable[mit.difficulty - 1], [MittenedTrap]);
        });

        it('should set Immobilized, Hobbled on hard', () => {
            let mit = new Mittens(3, '');
            assert.deepEqual(mit.statusTable[mit.difficulty - 1], [MittenedTrap]);
        });

        it('should set immobilized, incapacitated on extreme + impossible', () => {
            let mit = new Mittens(4, '');
            assert.deepEqual(mit.statusTable[mit.difficulty - 1], [MittenedTrap]);
            mit = new Mittens(5, '');
            assert.deepEqual(mit.statusTable[mit.difficulty - 1], [MittenedTrap]);
        });
    });
});