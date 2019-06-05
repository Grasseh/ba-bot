const assert = require('assert');
const ChastityHard = require('../../../src/status/chastityHard');

describe('ChastityHard', function() {
    describe('display', function() {
        it('should return description', () => {
            let chastityHard = new ChastityHard(1, 'Latex Belt');
            assert.strictEqual(chastityHard.display(), "-4 Traps, -2 to Hit, -2 to Escape bindings other than the Chastity Belt.");
        });
    });
    
    describe('toHit', () => {
        it('should be -2', () => {
            let chastityHard = new ChastityHard(1, 'Latex Belt');
            assert.strictEqual(chastityHard.toHit(), -2);
        });
    });

    describe('toEscape', () => {
        it('should be -2 if not the belt.', () => {
            let chastityHard = new ChastityHard(1, {id : 1});
            assert.strictEqual(chastityHard.toEscape({id : 2}), -2);
        });

        it('should be 0 if the belt.', () => {
            let chastityHard = new ChastityHard(1, {id : 1});
            assert.strictEqual(chastityHard.toEscape({id : 1}), 0);
        });
    });

    describe('ToTraps', () => {
        it('should be -4', () => {
            let chastityHard = new ChastityHard(1);
            assert.strictEqual(chastityHard.toTraps(), -4);
        });
    });

    describe('isCollar', () => {
        it('should be true', () => {
            let chastityHard = new ChastityHard(1);
            assert(chastityHard.isCollared());
        });
    });
});