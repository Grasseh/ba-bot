/* global describe, it */
const assert = require('assert');
const FullSkunking = require('../../../../../src/classes/spells/skunk/fullSkunking');
const LatexCorset = require('../../../../../src/restraints/skunk/latexCorset');
const LatexMittens = require('../../../../../src/restraints/skunk/latexMittens');
const LatexMuzzle = require('../../../../../src/restraints/skunk/latexMuzzle');
const LatexHeels = require('../../../../../src/restraints/skunk/latexHeel');
const sinon = require('sinon');

describe('Full Skunking', function() {
    describe('cast', function() {
        it('should call the easy-one activation on 1-4', () => {
            let enemy = "hi";
            let crit = false;
            let duel = "hello";
            let msg = 'hola';
            let dice = 'greetings';
            let fs = new FullSkunking();
            let activateOneStub = sinon.stub(fs, 'activateOne');
            fs.cast({enemy, effectRoll: 4, crit, duel, msg, dice});
            assert(activateOneStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateOneStub = sinon.stub(fs, 'activateOne');
            fs.cast({enemy, effectRoll: 1, crit, duel, msg, dice});
            assert(activateOneStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateOneStub = sinon.stub(fs, 'activateOne');
            fs.cast({enemy, effectRoll: 3, crit, duel, msg, dice});
            assert(activateOneStub.calledWith(enemy, msg, duel, dice));
        });
        
        it('should call the easy activation on 5-10', () => {
            let enemy = "hi";
            let crit = false;
            let duel = "hello";
            let msg = 'hola';
            let dice = 'greetings';
            let fs = new FullSkunking();
            let activateEasyStub = sinon.stub(fs, 'activateEasy');
            fs.cast({enemy, effectRoll: 5, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateEasyStub = sinon.stub(fs, 'activateEasy');
            fs.cast({enemy, effectRoll: 7, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateEasyStub = sinon.stub(fs, 'activateEasy');
            fs.cast({enemy, effectRoll: 10, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateEasyStub = sinon.stub(fs, 'activateEasy');
            crit = true;
            fs.cast({enemy, effectRoll: 3, crit, duel, msg, dice});
            assert(activateEasyStub.calledWith(enemy, msg, duel, dice));
        });

        it('should call the medium activation on 11-16', () => {
            let enemy = "hi";
            let crit = false;
            let duel = "hello";
            let msg = 'hola';
            let dice = 'greetings';
            let fs = new FullSkunking();
            let activateMediumStub = sinon.stub(fs, 'activateMedium');
            fs.cast({enemy, effectRoll: 11, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateMediumStub = sinon.stub(fs, 'activateMedium');
            fs.cast({enemy, effectRoll: 13, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateMediumStub = sinon.stub(fs, 'activateMedium');
            fs.cast({enemy, effectRoll: 16, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateMediumStub = sinon.stub(fs, 'activateMedium');
            crit = true;
            fs.cast({enemy, effectRoll: 7, crit, duel, msg, dice});
            assert(activateMediumStub.calledWith(enemy, msg, duel, dice));
        });

        it('should call the hard activation on 17-19', () => {
            let enemy = "hi";
            let crit = false;
            let duel = "hello";
            let msg = 'hola';
            let dice = 'greetings';
            let fs = new FullSkunking();
            let activateHardStub = sinon.stub(fs, 'activateHard');
            fs.cast({enemy, effectRoll: 17, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateHardStub = sinon.stub(fs, 'activateHard');
            fs.cast({enemy, effectRoll: 18, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateHardStub = sinon.stub(fs, 'activateHard');
            fs.cast({enemy, effectRoll: 19, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateHardStub = sinon.stub(fs, 'activateHard');
            crit = true;
            fs.cast({enemy, effectRoll: 12, crit, duel, msg, dice});
            assert(activateHardStub.calledWith(enemy, msg, duel, dice));
        });

        it('should call the impossible activation on 20', () => {
            let enemy = "hi";
            let crit = false;
            let duel = "hello";
            let msg = 'hola';
            let dice = 'greetings';
            let fs = new FullSkunking();
            let activateImpossibleStub = sinon.stub(fs, 'activateCrit');
            fs.cast({enemy, effectRoll: 20, crit, duel, msg, dice});
            assert(activateImpossibleStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateImpossibleStub = sinon.stub(fs, 'activateCrit');
            crit = true;
            fs.cast({enemy, effectRoll: 17, crit, duel, msg, dice});
            assert(activateImpossibleStub.calledWith(enemy, msg, duel, dice));
            fs = new FullSkunking();
            activateImpossibleStub = sinon.stub(fs, 'activateCrit');
            fs.cast({enemy, effectRoll: 20, crit, duel, msg, dice});
            assert(activateImpossibleStub.calledWith(enemy, msg, duel, dice));
        });
    });

    describe('activateEasy', () => {
        it('should apply easy in four locations', () => {
            let fs = new FullSkunking();
            let genBindingStub = sinon.stub(fs, 'applyGenericBinding');
            let enemy = {
                name : 'ThatGirl'
            };
            let duel = {};
            let msg = {
                channel : {
                    send : sinon.stub()
                } 
            }
            let {embed, changedState} = fs.activateEasy(enemy, msg, duel);
            assert(genBindingStub.calledWith(enemy, 'Latex Mittens', [1], 1, false, LatexMittens));
            assert(genBindingStub.calledWith(enemy, 'Latex Corset', [1], 1, false, LatexCorset));
            assert(genBindingStub.calledWith(enemy, 'Latex Heels', [1], 1, false, LatexHeels));
            assert(genBindingStub.calledWith(enemy, 'Latex Muzzle', [1], 1, false, LatexMuzzle));
            assert.strictEqual(changedState, false);
            assert.strictEqual(embed.description, 'ThatGirl has been hit by Full Skunking!\n All Easy bindings applied!');
        });
    });

    describe('activateMedium', () => {
        it('should apply medium in four locations', () => {
            let fs = new FullSkunking();
            let genBindingStub = sinon.stub(fs, 'applyGenericBinding');
            let enemy = {
                name : 'ThatGirl'
            };
            let duel = {};
            let msg = {
                channel : {
                    send : sinon.stub()
                } 
            }
            let {embed, changedState} = fs.activateMedium(enemy, msg, duel);
            assert(genBindingStub.calledWith(enemy, 'Latex Mittens', [2], 1, false, LatexMittens));
            assert(genBindingStub.calledWith(enemy, 'Latex Corset', [2], 1, false, LatexCorset));
            assert(genBindingStub.calledWith(enemy, 'Latex Heels', [2], 1, false, LatexHeels));
            assert(genBindingStub.calledWith(enemy, 'Latex Muzzle', [2], 1, false, LatexMuzzle));
            assert.strictEqual(changedState, false);
            assert.strictEqual(embed.description, 'ThatGirl has been hit by Full Skunking!\n All Medium bindings applied!');
        });
    });
    describe('activateHard', () => {
        it('should apply hard in four locations', () => {
            let fs = new FullSkunking();
            let genBindingStub = sinon.stub(fs, 'applyGenericBinding');
            let enemy = {
                name : 'ThatGirl'
            };
            let duel = {};
            let msg = {
                channel : {
                    send : sinon.stub()
                } 
            }
            let {embed, changedState} = fs.activateHard(enemy, msg, duel);
            assert(genBindingStub.calledWith(enemy, 'Latex Mittens', [3], 1, false, LatexMittens));
            assert(genBindingStub.calledWith(enemy, 'Latex Corset', [3], 1, false, LatexCorset));
            assert(genBindingStub.calledWith(enemy, 'Latex Heels', [3], 1, false, LatexHeels));
            assert(genBindingStub.calledWith(enemy, 'Latex Muzzle', [3], 1, false, LatexMuzzle));
            assert.strictEqual(changedState, false);
            assert.strictEqual(embed.description, 'ThatGirl has been hit by Full Skunking!\n All Hard bindings applied!');
        });
    });
    describe('activateCrit', () => {
        it('should apply impossible in four locations', () => {
            let fs = new FullSkunking();
            let genBindingStub = sinon.stub(fs, 'applyGenericBinding');
            let enemy = {
                name : 'ThatGirl'
            };
            let duel = {};
            let msg = {
                channel : {
                    send : sinon.stub()
                } 
            }
            let {embed, changedState} = fs.activateCrit(enemy, msg, duel);
            assert(genBindingStub.calledWith(enemy, 'Latex Mittens', [5], 1, false, LatexMittens));
            assert(genBindingStub.calledWith(enemy, 'Latex Corset', [5], 1, false, LatexCorset));
            assert(genBindingStub.calledWith(enemy, 'Latex Heels', [5], 1, false, LatexHeels));
            assert(genBindingStub.calledWith(enemy, 'Latex Muzzle', [5], 1, false, LatexMuzzle));
            assert.strictEqual(changedState, false);
            assert.strictEqual(embed.description, 'ThatGirl has been hit by Full Skunking!\n Fully Skunked! Impossible in all areas!');
        });
    });

    describe('activateOne', () => {
       it('should set the state to one easy binding selection, out of all skunk fours', () => {
            let fs = new FullSkunking();
            let msg = {
                channel : {
                    send : sinon.stub()
                } 
            };
            let duel = {
            };
            let enemy = {name : 'Erika'};
            let dice = 'hello';
            let {embed, changedState} = fs.activateOne(enemy, msg, duel, dice);
            assert.strictEqual(duel.state.difficulty, 'Easy');
            assert.strictEqual(duel.state.enemy.name, 'Erika');
            assert.strictEqual(duel.state.restraints.arms.name, 'Latex Mittens');
            assert.strictEqual(duel.state.restraints.legs.name, 'Latex Heels');
            assert.strictEqual(duel.state.restraints.head.name, 'Latex Muzzle');
            assert.strictEqual(duel.state.restraints.torso.name, 'Latex Corset');
            assert.strictEqual(changedState, true);
            assert.strictEqual(embed.description, 'Erika has been hit by a Full Skunking!\n Easy binding of any type.');
       });
    });

    describe('toHit', () => {
        it('should not have any effect', () => {
            let fs = new FullSkunking();
            let val = fs.toHit();
            assert.strictEqual(val, 0);
        });
    })

});