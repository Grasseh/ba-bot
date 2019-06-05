const assert = require('assert');
const LatexCorset = require('../../../../src/restraints/skunk/latexCorset');

describe('Latex Corset', function() {
    describe('getDescription', function() {
        it('should return difficulty description', () => {
            let lc = new LatexCorset(1, '');
            assert.strictEqual(lc.getDescription(), "Simple flexible latex waist cincher -- No Effect");
        });
    });
});