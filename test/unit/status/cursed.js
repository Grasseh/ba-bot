const assert = require('assert');
const Cursed = require('../../../src/status/cursed');
const sinon = require('sinon');

describe('Cursed', function() {
    describe('display', function() {
        it('should return description', () => {
            let cursed = new Cursed(1);
            assert.strictEqual(cursed.display(), "Any failed escape attempt tightens the binding in question!");
        });
    });
    
    describe('onFailedEscape', () => {
        it('should increase binding difficulty by 1', () => {
            let cursed = new Cursed(1);
            cursed.escapeClass = {
                increaseDifficulty : sinon.stub()
            }
            cursed.onFailedEscape('Erika', 'Latex Mittens', 'msgClass');
            assert(cursed.escapeClass.increaseDifficulty.calledWith('Latex Mittens', 'Erika', 'msgClass', 1));
        });
    });
});