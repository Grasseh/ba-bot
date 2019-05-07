/* global describe, it */
const assert = require('assert');
const SummonLatexMittens = require('../../../../../src/classes/spells/skunk/summonLatexMittens');
const LatexMittens = require('../../../../../src/restraints/skunk/latexMittens');
const sinon = require('sinon');

describe('Summon Latex Mittens', function() {
    describe('cast', function() {
        it('Should setup a generic Latex Mittens', function () {
            let slc = new SummonLatexMittens();
            let genBindingStub = sinon.stub(slc, 'applyGenericBinding');
            let opts = {
                enemy : "HY",
                effectRoll : 2,
                crit : false
            }
            slc.cast(opts);
            assert(genBindingStub.calledWith(opts.enemy, 'Latex Mittens', slc.getGenericEffectTable(), opts.effectRoll, opts.crit, LatexMittens));
        });
    });

});