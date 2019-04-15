/* global describe, it */
const assert = require('assert');
const msgp = require('../../src/messageProcessor');
const state = require('../../src/state');
const sinon = require('sinon');

describe('Integration', function() {
    describe('status', function() {
        it('Should gimme status out of duel', function () {
            let sendStub = sinon.stub();
            let message = {
                content : "!status",
                author : "b",
                channel : {
                    send : sendStub
                },
                guild : "d"
            }
            state.getState().logger = console;
            state.getState().bot = {
                user : {a : 'a'}
            };
            msgp.processMessage(message);
            let returned = sendStub.getCall(0).args[0].description;
            let expected = "You are not currently in a duel!";
            assert.equal(returned, expected);
        });
        
        it('Should gimme status in duel', function () {
            let msg1 = {
                content : "!duel <@2>",
                author : { id : 1},
                channel : {
                    send : sinon.stub()
                },
                guild : "d"
            }
            let msg3 = {
                content : "!accept",
                author :  { id : 3},
                channel : {
                    send : sinon.stub()
                },
                guild : "d"
            };
            let msg2 = {
                content : "!accept",
                author :  { id : 2},
                channel : {
                    send : sinon.stub()
                },
                guild : "d"
            };
            state.getState().logger = console;
            state.getState().bot = {
                user : {a : 'a'}
            };
            let diceI = 0;
            let diceArr = [{ dice : [18], sum : 18},
                { dice: [18], sum: 18 },
                { dice: [18], sum: 18 },
                { dice: [19], sum: 19 },
                { dice: [18], sum: 18 }];
            let diceFn = function () {
                return diceArr[diceI++];
            };
            diceStub = {
                d20 : sinon.stub().callsFake(diceFn)
            }
            msgp.processMessage(msg1, diceStub);
            msgp.processMessage(msg3, diceStub);
            msgp.processMessage(msg2, diceStub);
            assert.equal(msg1.channel.send.getCall(0).args[0].description, "<@2>, you have been challenged to a Bondage Arena duel! Write `!accept` to accept or `!cancel` to decline.");
            assert.equal(msg3.channel.send.getCall(0).args[0].description, "You are not currently in a duel!");
            assert.equal(msg2.channel.send.getCall(0).args[0].description, "Duel has begun!");
            assert.equal(msg2.channel.send.getCall(1).args[0].description, "Duel has begun! Rolls for initiative!");
            assert.equal(msg2.channel.send.getCall(2).args[0].description, "Initiative roll for <@1>!");
            assert.equal(msg2.channel.send.getCall(3).args[0].description, "Initiative roll for <@2>!");
            assert.equal(msg2.channel.send.getCall(4).args[0].description, "Initiative roll for <@1>!");
            assert.equal(msg2.channel.send.getCall(5).args[0].description, "Initiative roll for <@2>!");
            assert.equal(msg2.channel.send.getCall(6).args[0].description, "Beginning of <@2>'s turn!");
        });
    });
});