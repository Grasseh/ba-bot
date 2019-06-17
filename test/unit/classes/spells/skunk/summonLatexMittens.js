/* global describe, it */
const assert = require('assert');
const SummonLatexMittens = require('../../../../../src/classes/spells/skunk/summonLatexMittens');
const LatexMittens = require('../../../../../src/restraints/skunk/latexMittens');
const sinon = require('sinon');

describe('Summon Latex Mittens', function() {
    describe('cast', function() {
        it('Should setup a generic Latex Mittens', function () {
            let slm = new SummonLatexMittens();
            let genBindingStub = sinon.stub(slm, 'applyGenericBinding');
            let opts = {
                enemy : 'HY',
                effectRoll : 2,
                crit : false
            };
            slm.cast(opts);
            assert(genBindingStub.calledWith(opts.enemy, 'Latex Mittens', slm.getGenericEffectTable(), opts.effectRoll, opts.crit, LatexMittens));
        });
    });

});