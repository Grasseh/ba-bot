const assert = require('assert');
const Cinched = require('../../../src/status/cinched');

describe('Cinched', function() {
    describe('display', function() {
        it('should return description', () => {
            let cinched = new Cinched(1);
            assert.strictEqual(cinched.display(), "+1 Enemy Hit");
        });
    });
    
    describe('toEnemyHit', () => {
        it('should be +1', () => {
            let cinched = new Cinched(1);
            assert.strictEqual(cinched.toEnemyHit(), 1);
        });
    });
});