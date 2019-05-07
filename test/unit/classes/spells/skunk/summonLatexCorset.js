/* global describe, it */
const assert = require('assert');
const SummonLatexCorset = require('../../../../../src/classes/spells/skunk/summonLatexCorset');
const LatexCorset = require('../../../../../src/restraints/skunk/latexCorset');
const sinon = require('sinon');

describe('Summon Latex Corset', function() {
    describe('cast', function() {
        it('Should setup a generic Latex Corset', function () {
            let slc = new SummonLatexCorset();
            let genBindingStub = sinon.stub(slc, 'applyGenericBinding');
            let opts = {
                enemy : "HY",
                effectRoll : 2,
                crit : false
            }
            slc.cast(opts);
            assert(genBindingStub.calledWith(opts.enemy, 'Latex Corset', slc.getGenericEffectTable(), opts.effectRoll, opts.crit, LatexCorset));
        });
    });

});