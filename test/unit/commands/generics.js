/* global describe, it */
const { help, status, duel, accept, cancel, classSelect } = require('../../../src/commands/generics');
const assert = require('assert');
const sinon = require('sinon');
const state = require('../../../src/state');

let currentPlayer = {};
let currentDuel = {
    isPlayerTurn: (id) => id === '<@1234>',
    getCurrentPlayer : () => currentPlayer,
    displayStatus : sinon.stub(),
    cancel : sinon.stub(),
    accept : sinon.stub(),
    state : {
        nextState : sinon.stub()
    }
};

describe('combatCommands', () => {
    describe('help', () => {
        it(`should give out the list of basic commands`, () => {
            let msg = {
                channel: { send: sinon.stub() }
            };
            help([], msg);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "List of basic commands");
        });
    });

    describe('status', () => {
        it(`should propagate to duel entity`, () => {
            let msg = {
                channel: { send: sinon.stub() }
            };
            status([], msg, currentDuel);
            assert(currentDuel.displayStatus.calledWith(msg));
        });
    });

    describe('duel', () => {
        it('should not allow a duel if player is in a duel already', () => {
            let currentDuelStub = sinon.stub(state.getState(), 'getCurrentDuel').returns(true);
            let msg = {
                channel: { send: sinon.stub() },
                author : {id : '123'}
            };
            duel([], msg, currentDuel, {});
            assert(currentDuelStub.calledWith('123'));
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "You already are in a duel! Check your current duel status with `!status`!");
            currentDuelStub.restore();
        });

        it('should not allow a duel if a player challenges himself', () => {
            let currentDuelStub = sinon.stub(state.getState(), 'getCurrentDuel').returns(false);
            let msg = {
                channel: { send: sinon.stub() },
                author : {id : '123'}
            };
            duel(['<@!123>'], msg, currentDuel, {});
            assert(currentDuelStub.calledWith('123'));
            currentDuelStub.restore();
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "You cannot duel yourself!");
        });

        it('should create a new duel if all conditions are met', () => {
            let currentDuelStub = sinon.stub(state.getState(), 'getCurrentDuel').returns(false);
            let msg = {
                channel: { send: sinon.stub() },
                author : {id : '<@123>'}
            };
            duel(['<@!125>'], msg, currentDuel, {});
            assert(currentDuelStub.calledWith('<@123>'));
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "<@!125>, you have been challenged to a Bondage Arena duel! Write `!accept` to accept or `!cancel` to decline.");
            currentDuelStub.restore();
        });
    })

    describe('accept', () => {
        it(`should propagate to duel entity`, () => {
            let msg = {
                channel: { send: sinon.stub() }
            };
            accept([], msg, currentDuel);
            assert(currentDuel.accept.calledWith(msg));
        });
    });

    describe('cancel', () => {
        it(`should propagate to duel entity`, () => {
            let msg = {
                channel: { send: sinon.stub() }
            };
            cancel([], msg, currentDuel);
            assert(currentDuel.cancel.calledWith(msg));
        });
    });

    describe('classSelect', () => {
        it(`should propagate to duel entity`, () => {
            let msg = {
                channel: { send: sinon.stub() }
            };
            classSelect([], msg, currentDuel);
            assert(currentDuel.state.nextState.calledWith('class', msg, []));
        });
    });
});