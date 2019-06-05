const assert = require('assert');
const Breathless = require('../../../src/status/breathless');

describe('Breathless', function() {
    describe('display', function() {
        it('should return description', () => {
            let breathless = new Breathless(1);
            assert.strictEqual(breathless.display(), "+3 Enemy Hit");
        });
    });
    
    describe('toEnemyHit', () => {
        it('should be +3', () => {
            let breathless = new Breathless(1);
            assert.strictEqual(breathless.toEnemyHit(), 3);
        });
    });
});