/* global describe, it */
const { stand, move, attack, escape, increase, hug, bind, trapattack } = require('../../../src/commands/combat');
const assert = require('assert');
const sinon = require('sinon');

let currentPlayer = {};
let duel = {
    isPlayerTurn: (id) => id === '<@1234>',
    getCurrentPlayer : () => currentPlayer
};

describe('combatCommands', () => {

    describe('stand', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            stand([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to standing', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            stand([], msg, duel);
            assert(duel.state.nextState.calledWith('stand', msg));
        });
    });

    describe('move', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            move([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to moving', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            move([], msg, duel);
            assert(duel.state.nextState.calledWith('move', msg));
        });
    });

    describe('attack', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            attack([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to attacking', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            attack(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('attack', msg, ['MUZZLE']));
        });
    });

    describe('escape', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            escape([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to escaping', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            escape(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('escape', msg, ['MUZZLE']));
        });
    });

    describe('increase', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            increase([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to increasing', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            increase(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('increase', msg, ['MUZZLE']));
        });
    });

    describe('hug', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            hug([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to hugging', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            hug(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('hug', msg, ['MUZZLE']));
        });
    });

    describe('bind', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            bind([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should set the state to binding', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            duel.state = {
                nextState: sinon.stub()
            };
            bind(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('bind', msg, ['MUZZLE']));
        });
    });

    describe('trapattack', () => {
        it('should return an error message if it\'s not the player\'s turn', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1235' }
            };
            trapattack([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'It is currently not your turn!');
        });

        it('should return an error message if trap attack is not enabled', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            currentPlayer.isTrapAttackEnabled = sinon.stub().returns(false);
            trapattack([], msg, duel);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, 'This command is currently not available!');
        });

        it('should set the state to trap attacking', () => {
            let msg = {
                channel: { send: sinon.stub() },
                author: { id: '1234' }
            };
            currentPlayer.isTrapAttackEnabled = sinon.stub().returns(true);
            duel.state = {
                nextState: sinon.stub()
            };
            trapattack(['MUZZLE'], msg, duel);
            assert(duel.state.nextState.calledWith('trapattack', msg, ['MUZZLE']));
        });
    });
});