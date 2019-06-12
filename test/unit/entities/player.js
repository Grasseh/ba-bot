/* global describe, it */
const assert = require('assert');
const Player = require('../../../src/entities/player');
const sinon = require('sinon');

describe('Player', function() {
    describe('addRestraint', () => {
        it('should add a restraint to the player', () => {
            let player = new Player('<@12345>');
            player.addRestraint('Latex Muzzle');
            player.addRestraint('Latex Mittens');
            assert.deepEqual(player.restraints, ['Latex Muzzle', 'Latex Mittens']);
        });
    });

    describe('getRestriants', () => {
        it('should return the player\'s restraint array property', () => {
            let player = new Player('<@12345>');
            player.restraints = ['Latex Mittens', 'Latex Heels'];
            assert.deepEqual(player.getRestraints(), ['Latex Mittens', 'Latex Heels']);
        });
    });

    describe('addEffect', () => {
        it('should add an effect to the player', () => {
            let player = new Player('<@12345>');
            player.addEffect('Bound');
            player.addEffect('Tight');
            assert.deepEqual(player.effects, ['Bound', 'Tight']);
        });
    });

    describe('cooldown', () => {
        it('should check if each effect is done through cooldowns and remove them', () => {
            let player = new Player('<@12345>');
            player.addEffect({
                name : 'Bound',
                cooldown : sinon.stub().returns(true)
            });
            player.addEffect({
                name : 'Tight',
                cooldown : sinon.stub().returns(false)
            });
            player.cooldown();
            assert.strictEqual(player.effects[0].name, 'Tight');
            assert.strictEqual(player.effects.length, 1);
        })
    });

    describe('cooldownOther', () => {
        it('should check if each effect is done through cooldowns (after other\'s turn) and remove them', () => {
            let player = new Player('<@12345>');
            player.addEffect({
                name : 'Bound',
                cooldownOther : sinon.stub().returns(false)
            });
            player.addEffect({
                name : 'Tight',
                cooldownOther : sinon.stub().returns(true)
            });
            player.cooldownOther();
            assert.strictEqual(player.effects[0].name, 'Bound');
            assert.strictEqual(player.effects.length, 1);
        })
    });

    describe('getClassName', () => {
        it('should return error message if no class name', () => {
            let player = new Player('<@12345>');
            let result = player.getClassName();
            assert.strictEqual(result, 'No class selected yet');
        });

        it('should return class name', () => {
            let player = new Player('<@12345>');
            player.class = {
                getClassName : sinon.stub().returns('Latex Wizard')
            }
            let result = player.getClassName();
            assert.strictEqual(result, 'Latex Wizard');
        });
    });

    describe('getSpellList', () => {
        it('should delegate to class', () => {
            let player = new Player('<@12345>');
            player.class = {
                getSpellList : sinon.stub().returns('SPELLS')
            }
            let result = player.getSpellList();
            assert.strictEqual(result, 'SPELLS');
        });
    });

    describe('getNonSpellList', () => {
        it('should delegate to class', () => {
            let player = new Player('<@12345>');
            player.class = {
                getNonSpellList : sinon.stub().returns('NOTSPELLS')
            }
            let result = player.getNonSpellList();
            assert.strictEqual(result, 'NOTSPELLS');
        });
    });

    describe('getAllActions', () => {
        it('should delegate to class', () => {
            let player = new Player('<@12345>');
            player.class = {
                getAllActions : sinon.stub().returns('ACTIONS')
            }
            let result = player.getAllActions('dueelz');
            assert.strictEqual(result, 'ACTIONS');
            assert(player.class.getAllActions.calledWith('dueelz'));
        });
    });

    describe('getEscapableBodyParts', () => {
        it('should return all restraint names that are not impossible', () => {
            let player = new Player('<@12345>');
            player.restraints = [{
                difficulty : 5,
                getCommand : sinon.stub().returns('NOTTHISONE')
            }, {
                difficulty : 4,
                getCommand : sinon.stub().returns('YesThisOne')
            }, {
                difficulty : 1,
                getCommand : sinon.stub().returns('EasyLatexMittens')
            }];
            let result = player.getEscapableBodyParts();
            assert.deepEqual(result, ['yesthisone', 'easylatexmittens']);
        });
    });

    describe('isFullExtreme', () => {
        it('should return true if there\'s extreme or more on legs, arms and head.', () => {
            let player = new Player('<@12345>');
            player.restraints = [{
                difficulty : 4,
                location : 'Head',
            }, {
                difficulty : 4,
                location : 'Arms',
            }, {
                difficulty : 4,
                location : 'Legs',
            }, {
                difficulty : 1,
                location : 'Chest',
            }];
            assert(player.isFullExtreme());
        });

        it('should return true if there\'s impossible mixed in or more on legs, arms and head.', () => {
            let player = new Player('<@12345>');
            player.restraints = [{
                difficulty : 4,
                location : 'Head',
            }, {
                difficulty : 5,
                location : 'Arms',
            }, {
                difficulty : 5,
                location : 'Legs',
            }, {
                difficulty : 4,
                location : 'Chest',
            }];
            assert(player.isFullExtreme());
        });

        it('should return false even if another body part is extreme, if one\'s missing.', () => {
            let player = new Player('<@12345>');
            player.restraints = [{
                difficulty : 4,
                location : 'Head',
            }, {
                difficulty : 4,
                location : 'Arms',
            }, {
                difficulty : 4,
                location : 'Other',
            }];
            assert(!player.isFullExtreme());
        });

        it('should return false even if another body part is extreme, if one\'s too low.', () => {
            let player = new Player('<@12345>');
            player.restraints = [{
                difficulty : 4,
                location : 'Head',
            }, {
                difficulty : 1,
                location : 'Arms',
            }, {
                difficulty : 5,
                location : 'Legs',
            }, {
                difficulty : 4,
                location : 'Chest',
            }];
            assert(!player.isFullExtreme());
        });
    });

    describe('canMove', () => {
        it('should be true if no effects stop movement', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                canMove : sinon.stub().returns(true)
            }, {
                canMove : sinon.stub().returns(true)
            }];
            assert(player.canMove());
        });

        it('should be false if effects stop movement', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                canMove : sinon.stub().returns(false)
            }, {
                canMove : sinon.stub().returns(true)
            }];
            assert(!player.canMove());
        });
    });

    describe('canStand', () => {
        it('should be true if no effects stop standing', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                canStand : sinon.stub().returns(true)
            }, {
                canStand : sinon.stub().returns(true)
            }];
            assert(player.canStand());
        });

        it('should be false if effects stop standing', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                canStand : sinon.stub().returns(false)
            }, {
                canStand : sinon.stub().returns(true)
            }];
            assert(!player.canStand());
        });
    });

    describe('isTrapAttackEnabled', () => {
        it('should be true if an effect enables trapattack', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                isTrapAttackAvailable : sinon.stub().returns(true)
            }, {
                isTrapAttackAvailable : sinon.stub().returns(false)
            }];
            assert(player.isTrapAttackEnabled());
        });

        it('should be false if effects stop standing', () => {
            let player = new Player('<@12345>');
            player.effects = [{
                isTrapAttackAvailable : sinon.stub().returns(false)
            }, {
                isTrapAttackAvailable : sinon.stub().returns(false)
            }];
            assert(!player.isTrapAttackEnabled());
        });
    });

    describe('getUpgradableTraps', () => {
        it('should return a list of commands containing upgradable trap restraints', () => {
            let player = new Player('<@12345>');
            player.addRestraint({
                command : 'immobilizationtrap',
                difficulty : 4
            });
            player.addRestraint({
                command : 'latexmittens',
                difficulty : 2
            });
            player.addRestraint({
                command : 'chastity',
                difficulty : 5
            });
            player.addRestraint({
                command : 'mittens',
                difficulty : 2
            });
            let result = player.getUpgradableTraps();
            assert.deepEqual(result, ['immobilizationtrap', 'mittens']);
        });
    });
});