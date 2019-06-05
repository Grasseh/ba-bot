const assert = require('assert');
const Dizzy = require('../../../src/status/dizzy');

describe('Dizzy', function() {
    describe('display', function() {
        it('should return description', () => {
            let dizzy = new Dizzy(1);
            assert.strictEqual(dizzy.display(), "-3 Traps");
        });
    });
    
    describe('toTraps', () => {
        it('should be -3', () => {
            let dizzy = new Dizzy(1);
            assert.strictEqual(dizzy.toTraps(), -3);
        });
    });
});