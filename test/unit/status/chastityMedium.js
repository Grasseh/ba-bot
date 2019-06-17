/* global describe, it */
const assert = require('assert');
const ChastityMedium = require('../../../src/status/chastityMedium');

describe('ChastityMedium', function() {
    describe('display', function() {
        it('should return description', () => {
            let chastityMedium = new ChastityMedium(1, 'Latex Belt');
            assert.strictEqual(chastityMedium.display(), '-2 Traps');
        });
    });

    describe('ToTraps', () => {
        it('should be -2', () => {
            let chastityMedium = new ChastityMedium(1);
            assert.strictEqual(chastityMedium.toTraps(), -2);
        });
    });

    describe('isCollar', () => {
        it('should be true', () => {
            let chastityMedium = new ChastityMedium(1);
            assert(chastityMedium.isCollared());
        });
    });
});