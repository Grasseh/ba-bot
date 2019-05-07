/* global describe, it */
const assert = require('assert');
const SummonLatexMuzzle = require('../../../../../src/classes/spells/skunk/summonLatexMuzzle');
const LatexMuzzle = require('../../../../../src/restraints/skunk/latexMuzzle');
const sinon = require('sinon');

describe('Summon Latex Muzzle', function() {
    describe('cast', function() {
        it('Should setup a generic Latex Muzzle', function () {
            let slc = new SummonLatexMuzzle();
            let genBindingStub = sinon.stub(slc, 'applyGenericBinding');
            let opts = {
                enemy : "HY",
                effectRoll : 2,
                crit : false
            }
            slc.cast(opts);
            assert(genBindingStub.calledWith(opts.enemy, 'Latex Muzzle', slc.getGenericEffectTable(), opts.effectRoll, opts.crit, LatexMuzzle));
        });
    });

});