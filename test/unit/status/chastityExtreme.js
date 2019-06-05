const assert = require('assert');
const ChastityExtreme = require('../../../src/status/chastityExtreme');

describe('ChastityExtreme', function() {
    describe('display', function() {
        it('should return description', () => {
            let chastityExtreme = new ChastityExtreme(1, 'Latex Belt');
            assert.strictEqual(chastityExtreme.display(), "-6 Traps, -4 to Hit, -4 to Escape bindings other than the Chastity Belt.");
        });
    });
    
    describe('toHit', () => {
        it('should be -4', () => {
            let chastityExtreme = new ChastityExtreme(1, 'Latex Belt');
            assert.strictEqual(chastityExtreme.toHit(), -4);
        });
    });

    describe('toEscape', () => {
        it('should be -4 if not the belt.', () => {
            let chastityExtreme = new ChastityExtreme(1, {id : 1});
            assert.strictEqual(chastityExtreme.toEscape({id : 2}), -4);
        });

        it('should be 0 if the belt.', () => {
            let chastityExtreme = new ChastityExtreme(1, {id : 1});
            assert.strictEqual(chastityExtreme.toEscape({id : 1}), 0);
        });
    });

    describe('ToTraps', () => {
        it('should be -6', () => {
            let chastityExtreme = new ChastityExtreme(1);
            assert.strictEqual(chastityExtreme.toTraps(), -6);
        });
    });

    describe('isCollar', () => {
        it('should be true', () => {
            let chastityExtreme = new ChastityExtreme(1);
            assert(chastityExtreme.isCollared());
        });
    });
});