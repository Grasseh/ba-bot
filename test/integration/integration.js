/* global describe, it */
const assert = require('assert');
const msgp = require('../../src/messageProcessor');
const state = require('../../src/state');
const sinon = require('sinon');

describe('Integration', function () {
    function generateMessage(content, authorId){
        return {
            content: content,
            author: { id: authorId },
            channel: {
                send: sinon.stub()
            },
            guild: "d"
        }
    }

    it('Should gimme status out of duel', function () {
        let sendStub = sinon.stub();
        let message = {
            content: "!status",
            author: "b",
            channel: {
                send: sendStub
            },
            guild: "d"
        }
        state.getState().logger = {
            info: () => { }
        };
        state.getState().bot = {
            user: { a: 'a' }
        };
        msgp.processMessage(message);
        let returned = sendStub.getCall(0).args[0].description;
        let expected = "You are not currently in a duel!";
        assert.equal(returned, expected);
    });

    it('Should gimme status in duel', function () {
        let msgDuel = generateMessage('!duel <@2>', "1");
        let msgNotInDuel = generateMessage('!accept', "3");
        let msgAccept = generateMessage('!accept', "2");
        let msgClassTwo = generateMessage('!class latexskunk', "2");
        let msgClassOne = generateMessage('!class latexskunk', "1");
        let msgStandTwo = generateMessage('!stand', "2");
        let msgStatus = generateMessage('!status', "2");
        let msgFailAttack = generateMessage('!attack muzzl', "2");
        let msgAttackTwo = generateMessage('!attack latexheels', "2");
        let msgEscapeTwo = generateMessage('!escape latexmuzzle', "2");
        let msgStandOne = generateMessage('!stand', "1");
        let msgAttackOne = generateMessage('!attack latexmuzzle', "1");
        state.getState().logger = {
            info: () => { }
        };
        state.getState().bot = {
            user: { a: 'a' }
        };
        let diceI = 0;
        let diceArr = [{ dice: [18], sum: 18 }, //Init 1 
        { dice: [18], sum: 18 },
        { dice: [18], sum: 18 },
        { dice: [19], sum: 19 }, //Init 4
        { dice: [5], sum: 5 }, //Attack roll 1 (Miss)
        { dice: [7], sum: 7 }, //Attack roll 2 (Hit because still)
        { dice: [13], sum: 13 }, //Effect roll 1 (Hard)
        { dice: [19], sum: 19 }, //attack roll 3 (Miss Because of muzzle)
        { dice: [6], sum: 6 }, //attack roll 4 (Hit because of muzzle)
        { dice: [1], sum: 1 }, //Effect roll 2 (Extreme)
        { dice: [5], sum: 5 }, //Escape roll 1

        ];
        let diceFn = function () {
            return diceArr[diceI++];
        };
        diceStub = {
            d20: sinon.stub().callsFake(diceFn)
        }
        msgp.processMessage(msgDuel, diceStub);
        msgp.processMessage(msgNotInDuel, diceStub);
        msgp.processMessage(msgAccept, diceStub);
        msgp.processMessage(msgClassTwo, diceStub);
        msgp.processMessage(msgClassOne, diceStub);
        msgp.processMessage(msgStandTwo, diceStub);
        msgp.processMessage(msgStatus, diceStub);
        msgp.processMessage(msgFailAttack, diceStub);
        msgp.processMessage(msgAttackTwo, diceStub);
        msgp.processMessage(msgStandOne, diceStub);
        msgp.processMessage(msgAttackOne, diceStub);
        msgp.processMessage(msgStatus, diceStub);
        msgp.processMessage(msgStandTwo, diceStub);
        msgp.processMessage(msgAttackTwo, diceStub);
        msgp.processMessage(msgStandOne, diceStub);
        msgp.processMessage(msgAttackOne, diceStub);
        msgp.processMessage(msgStandTwo, diceStub);
        msgp.processMessage(msgEscapeTwo, diceStub);
        assert.equal(msgDuel.channel.send.getCall(0).args[0].description, "<@2>, you have been challenged to a Bondage Arena duel! Write `!accept` to accept or `!cancel` to decline.");
        assert.equal(msgNotInDuel.channel.send.getCall(0).args[0].description, "You are not currently in a duel!");
        assert.equal(msgAccept.channel.send.getCall(0).args[0].description, "Duel has begun!");
        assert.equal(msgAccept.channel.send.getCall(1).args[0].description, "Class selection!");
        assert.equal(msgClassTwo.channel.send.getCall(0).args[0].description, "<@2> is now a Skunk Warlock!");
        assert.equal(msgClassOne.channel.send.getCall(0).args[0].description, "<@1> is now a Skunk Warlock!");
        assert.equal(msgClassOne.channel.send.getCall(1).args[0].description, "Duel has begun! Rolls for initiative!");
        assert.equal(msgClassOne.channel.send.getCall(2).args[0].description, "Initiative roll for <@1>!");
        assert.equal(msgClassOne.channel.send.getCall(3).args[0].description, "Initiative roll for <@2>!");
        assert.equal(msgClassOne.channel.send.getCall(4).args[0].description, "Initiative roll for <@1>!");
        assert.equal(msgClassOne.channel.send.getCall(5).args[0].description, "Initiative roll for <@2>!");
        assert.equal(msgClassOne.channel.send.getCall(6).args[0].description, "Beginning of <@2>'s turn!");
        assert.equal(msgStandTwo.channel.send.getCall(0).args[0].description, "<@2>'s Action Phase!");
        assert.equal(msgStatus.channel.send.getCall(0).args[0].author.name, "Bondage Arena Duel Status!");
        assert.equal(msgFailAttack.channel.send.getCall(0).args[0].description, "Invalid command or bodypart! <@2>\'s turn.");
        assert.equal(msgAttackTwo.channel.send.getCall(0).args[0].description, "Hit roll for <@2> using latexheels!");
        assert.equal(msgAttackTwo.channel.send.getCall(1).args[0].description, "Result for <@2> using latexheels!");
        assert.equal(msgAttackTwo.channel.send.getCall(2).args[0].description, "Beginning of <@1>'s turn!");
        assert.equal(msgStandOne.channel.send.getCall(0).args[0].description, "<@1>'s Action Phase!");
        assert.equal(msgAttackOne.channel.send.getCall(0).args[0].description, "Hit roll for <@1> using latexmuzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(1).args[0].description, "Effect roll for <@1> using latexmuzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(2).args[0].description, "<@2> has been hit by Latex Muzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(3).args[0].description, "Beginning of <@2>'s turn!");
        assert.equal(msgStandTwo.channel.send.getCall(1).args[0].description, "<@2>'s Action Phase!");
        assert.equal(msgAttackTwo.channel.send.getCall(3).args[0].description, "Hit roll for <@2> using latexheels!");
        assert.equal(msgAttackTwo.channel.send.getCall(4).args[0].description, "Result for <@2> using latexheels!");
        assert.equal(msgAttackTwo.channel.send.getCall(5).args[0].description, "Beginning of <@1>'s turn!");
        assert.equal(msgStandOne.channel.send.getCall(1).args[0].description, "<@1>'s Action Phase!");
        assert.equal(msgAttackOne.channel.send.getCall(4).args[0].description, "Hit roll for <@1> using latexmuzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(5).args[0].description, "Effect roll for <@1> using latexmuzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(6).args[0].description, "<@2> has been hit by Latex Muzzle!");
        assert.equal(msgAttackOne.channel.send.getCall(7).args[0].description, "Beginning of <@2>'s turn!");
        assert.equal(msgEscapeTwo.channel.send.getCall(0).args[0].description, "Escape roll for <@2>, attempting to free herself from her Latex Muzzle!");
        assert.equal(msgEscapeTwo.channel.send.getCall(1).args[0].description, "<@2> failed to free herself from her Latex Muzzle!");
        assert.equal(msgEscapeTwo.channel.send.getCall(2).args[0].description, "Beginning of <@1>'s turn!");
    });
});