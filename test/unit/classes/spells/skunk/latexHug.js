/* global describe, it */
const assert = require('assert');
const LatexHug = require('../../../../../src/classes/spells/skunk/latexHug');
const LatexCorset = require('../../../../../src/restraints/skunk/latexCorset');
const LatexMittens = require('../../../../../src/restraints/skunk/latexMittens');
const LatexMuzzle = require('../../../../../src/restraints/skunk/latexMuzzle');
const LatexHeels = require('../../../../../src/restraints/skunk/latexHeel');
const sinon = require('sinon');

describe('Latex Hug', function() {
    describe('toHit', () => {
        it('should not have any effect if enemy is boring', () => {
            let lh = new LatexHug();
            let target = {
                effects : []
            };
            let val = lh.toHit({target});
            assert.strictEqual(val, 0);
        });

        it('should not have any effect if enemy is hit with an effect that is not in the arms', () => {
            let lh = new LatexHug();
            let target = {
                effects : [{name : 'Hobbled'}]
            };
            let val = lh.toHit({target});
            assert.strictEqual(val, 0);
        });

        it('should be +2 if Bound', () => {
            let lh = new LatexHug();
            let target = {
                effects : [{name : 'Bound'}, {name : 'Vibrating'}]
            };
            let val = lh.toHit({target});
            assert.strictEqual(val, 2);
        });

        it('should be +2 if Mittened', () => {
            let lh = new LatexHug();
            let target = {
                effects : [{name : 'Immobilized'}, {name : 'Mittened'}]
            };
            let val = lh.toHit({target});
            assert.strictEqual(val, 2);
        });

        it('should be +2 if Harnessed', () => {
            let lh = new LatexHug();
            let target = {
                effects : [{name : 'Harnessed'}]
            };
            let val = lh.toHit({target});
            assert.strictEqual(val, 2);
        });
    });

    describe('cast', () => {
        it('should call the easy activation on 1-7', () => {
            let enemy = 'hi';
            let crit = false;
            let duel = 'hello';
            let msg = 'hola';
            let dice = 'greetings';
            let lh = new LatexHug();
            let activateEasyStub = sinon.stub(lh, 'activateEasy');
            lh.cast({enemy, effectRoll: 4, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateEasyStub = sinon.stub(lh, 'activateEasy');
            lh.cast({enemy, effectRoll: 1, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateEasyStub = sinon.stub(lh, 'activateEasy');
            lh.cast({enemy, effectRoll: 7, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, duel, msg, dice));
        });

        it('should call the medium activation on 8-13', () => {
            let enemy = 'hi';
            let crit = false;
            let duel = 'hello';
            let msg = 'hola';
            let dice = 'greetings';
            let lh = new LatexHug();
            let activateMediumStub = sinon.stub(lh, 'activateMedium');
            lh.cast({enemy, effectRoll: 8, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateMediumStub = sinon.stub(lh, 'activateMedium');
            lh.cast({enemy, effectRoll: 11, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateMediumStub = sinon.stub(lh, 'activateMedium');
            lh.cast({enemy, effectRoll: 13, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateMediumStub = sinon.stub(lh, 'activateMedium');
            crit = true;
            lh.cast({enemy, effectRoll: 7, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, duel, msg, dice));
        });

        it('should call the hard activation on 14-19', () => {
            let enemy = 'hi';
            let crit = false;
            let duel = 'hello';
            let msg = 'hola';
            let dice = 'greetings';
            let lh = new LatexHug();
            let activateHardStub = sinon.stub(lh, 'activateHard');
            lh.cast({enemy, effectRoll: 14, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateHardStub = sinon.stub(lh, 'activateHard');
            lh.cast({enemy, effectRoll: 17, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateHardStub = sinon.stub(lh, 'activateHard');
            lh.cast({enemy, effectRoll: 19, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateHardStub = sinon.stub(lh, 'activateHard');
            crit = true;
            lh.cast({enemy, effectRoll: 13, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, duel, msg, dice));
        });

        it('should call the crit activation on 20', () => {
            let enemy = 'hi';
            let crit = false;
            let duel = 'hello';
            let msg = 'hola';
            let dice = 'greetings';
            let lh = new LatexHug();
            let activateCritStub = sinon.stub(lh, 'activateCrit');
            lh.cast({enemy, effectRoll: 20, crit, duel, msg, dice});
            assert(activateCritStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateCritStub = sinon.stub(lh, 'activateCrit');
            crit = true;
            lh.cast({enemy, effectRoll: 14, crit, duel, msg, dice});
            assert(activateCritStub.calledWith(enemy, duel, msg, dice));
            lh = new LatexHug();
            activateCritStub = sinon.stub(lh, 'activateCrit');
            lh.cast({enemy, effectRoll: 20, crit, duel, msg, dice});
            assert(activateCritStub.calledWith(enemy, duel, msg, dice));
        });
    });

    describe('activateCrit', () => {
        it('should apply medium in four locations', () => {
            let lh = new LatexHug();
            let genBindingStub = sinon.stub(lh, 'applyGenericBinding');
            let enemy = {
                name : 'ThatGirl'
            };
            let duel = {};
            let msg = {
                channel : {
                    send : sinon.stub()
                }
            };
            let {embed, changedState} = lh.activateCrit(enemy, duel, msg);
            assert(genBindingStub.calledWith(enemy, 'Latex Mittens', [2], 1, false, LatexMittens));
            assert(genBindingStub.calledWith(enemy, 'Latex Corset', [2], 1, false, LatexCorset));
            assert(genBindingStub.calledWith(enemy, 'Latex Heels', [2], 1, false, LatexHeels));
            assert(genBindingStub.calledWith(enemy, 'Latex Muzzle', [2], 1, false, LatexMuzzle));
            assert.strictEqual(changedState, false);
            assert.strictEqual(embed.description, 'ThatGirl has been hit by a Latex Hug!\n Snuggle! Medium bindings in every location!');
        });
    });

    describe('activateEasy', () => {
        it('should set the state to an easy binding selection', () => {
            let lh = new LatexHug();
            let msg = {
                channel : {
                    send : sinon.stub()
                }
            };
            let duel = {
            };
            let enemy = {name : 'Erika'};
            let dice = 'hello';
            let {embed, changedState} = lh.activateEasy(enemy, duel, msg, dice);
            assert.strictEqual(duel.state.difficulty, 'Easy');
            assert.strictEqual(duel.state.enemy.name, 'Erika');
            assert.strictEqual(changedState, true);
            assert.strictEqual(embed.description, 'Erika has been hit by a Latex Hug!\n Easy binding in any location except for the gag!');
        });
    });

    describe('activateMedium', () => {
        it('should set the state to a medium binding selection', () => {
            let lh = new LatexHug();
            let msg = {
                channel : {
                    send : sinon.stub()
                }
            };
            let duel = {
            };
            let enemy = {name : 'Erika'};
            let dice = 'hello';
            let {embed, changedState} = lh.activateMedium(enemy, duel, msg, dice);
            assert.strictEqual(duel.state.difficulty, 'Medium');
            assert.strictEqual(duel.state.enemy.name, 'Erika');
            assert.strictEqual(changedState, true);
            assert.strictEqual(embed.description, 'Erika has been hit by a Latex Hug!\n Medium binding in any location except for the gag!');
        });
    });

    describe('activateHard', () => {
        it('should set the state to a hard binding selection', () => {
            let lh = new LatexHug();
            let msg = {
                channel : {
                    send : sinon.stub()
                }
            };
            let duel = {
            };
            let enemy = {name : 'Erika'};
            let dice = 'hello';
            let {embed, changedState} = lh.activateHard(enemy, duel, msg, dice);
            assert.strictEqual(duel.state.difficulty, 'Hard');
            assert.strictEqual(duel.state.enemy.name, 'Erika');
            assert.strictEqual(changedState, true);
            assert.strictEqual(embed.description, 'Erika has been hit by a Latex Hug!\n Smooch! Hard binding in any location!');
        });
    });
});