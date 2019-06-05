const assert = require('assert');
const RevengeCollar = require('../../../../src/restraints/traps/revengeCollar');
const Cursed = require('../../../../src/status/cursed');

describe('Revenge Collar', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let rc = new RevengeCollar(1, '');
            assert.strictEqual(rc.getDescription(), "Lucky! This collar seems to have lost its power, rendering it a simple locked latex collar around your neck. Hopefully nothing upgrades it... -- No Effect");
        });
    });
    
    describe('constructor', () => {
        it('should set nothing on easy', () => {
            let rc = new RevengeCollar(1, '');
            assert.deepEqual(rc.statusTable[rc.difficulty - 1], []);
        });

        it('should set nothing on medium', () => {
            let rc = new RevengeCollar(2, '');
            assert.deepEqual(rc.statusTable[rc.difficulty - 1], []);
        });

        it('should set cursed on hard', () => {
            let rc = new RevengeCollar(3, '');
            assert.deepEqual(rc.statusTable[rc.difficulty - 1], [Cursed]);
        });

        it('should set cursed on extreme + impossible', () => {
            let rc = new RevengeCollar(4, '');
            assert.deepEqual(rc.statusTable[rc.difficulty - 1], [Cursed]);
            rc = new RevengeCollar(5, '');
            assert.deepEqual(rc.statusTable[rc.difficulty - 1], [Cursed]);
        });
    });
});