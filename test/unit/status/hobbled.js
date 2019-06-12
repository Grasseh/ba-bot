const assert = require('assert');
const Hobbled = require('../../../src/status/hobbled');

describe('Hobbled', function() {
    describe('display', function() {
        it('should return description', () => {
            let hobbled = new Hobbled(1);
            assert.strictEqual(hobbled.display(), "-2 Traps, +4 Enemy Hit");
        });
    });
    
    describe('toTraps', () => {
        it('should be -2', () => {
            let hobbled = new Hobbled(1);
            assert.strictEqual(hobbled.toTraps(), -2);
        });
    });

    describe('toEnemyHit', () => {
        it('should be +4', () => {
            let hobbled = new Hobbled(1);
            assert.strictEqual(hobbled.toEnemyHit(), 4);
        });
    });

});