/* global describe, it */
const assert = require('assert');
const SummonLatexHeels = require('../../../../../src/classes/spells/skunk/summonLatexHeels');
const LatexHeels = require('../../../../../src/restraints/skunk/latexHeel');
const sinon = require('sinon');

describe('Summon Latex Heels', function() {
    describe('cast', function() {
        it('Should setup a generic Latex Heels', function () {
            let slh = new SummonLatexHeels();
            let genBindingStub = sinon.stub(slh, 'applyGenericBinding');
            let opts = {
                enemy : "HY",
                effectRoll : 2,
                crit : false
            }
            slh.cast(opts);
            assert(genBindingStub.calledWith(opts.enemy, 'Latex Heels', slh.getGenericEffectTable(), opts.effectRoll, opts.crit, LatexHeels));
        });
    });

});