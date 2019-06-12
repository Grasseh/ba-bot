/* global describe, it */
const assert = require('assert');
const Duel = require('../../../src/entities/duel');
const state = require('../../../src/state');
const sinon = require('sinon');

describe('Duel', function() {
    describe('constructor', () => {
        it('should set to waiting state with invited player', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            assert.deepEqual(duel.invited, ['<@1234>']);
            assert.deepEqual(duel.players, ['<@123>']);
            assert.strictEqual(duel.state.constructor.name, 'WaitingState');
        });
    });

    describe('accept', () => {
        it('should disallow a player not in the invited state to accept', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            state.getState().bot = {
                user : {a : 'a'}
            };
            let msg = {
                channel : { send : sinon.stub() },
                author : {id : '123'}
            }
            duel.accept(msg);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "You cannot accept this duel!");
            assert.strictEqual(duel.players.length, 1);
        });

        it('should create all players and start the duel', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            state.getState().bot = {
                user : {a : 'a'}
            };
            let msg = {
                channel : {send : sinon.stub()},
                author : {id : '1234'}
            };
            duel.accept(msg);
            assert.strictEqual(duel.invited.length, 0);
            assert.strictEqual(duel.playerstates.length, 2);
            assert.strictEqual(duel.playerstates.filter(x => x.name === '<@123>').length, 1);
            assert.strictEqual(duel.playerstates.filter(x => x.name === '<@1234>').length, 1);
            assert.strictEqual(duel.playerstates.filter(x => x.name === '<@12345>').length, 0);
        });
    });

    describe('cancel', () => {
        it('should abort the current duel', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            state.getState().bot = {
                user : {a : 'a'}
            };
            state.getState().duels = [duel];
            let msg = {
                channel : {send : sinon.stub()},
            };
            assert.strictEqual(state.getState().duels.length , 1);
            duel.cancel(msg);
            assert.strictEqual(state.getState().duels.length , 0);
        });
    })

    describe('isPlaying', () => {
        it('should be true if the game is going', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234');
            assert.strictEqual(duel.isPlaying(), true);
        });

        it('should be false if the game is not going', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            assert.strictEqual(duel.isPlaying(), false);
        });
    });

    describe('isPlayerTurn', () => {
        it('should be true if it\'s the player\'s turn', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234>' , '<@123>');
            duel.getCurrentPlayer = sinon.stub().returns({name : '<@123>'})
            assert.strictEqual(duel.isPlayerTurn('<@123>'), true);
        });

        it('should be false if it\'s not the player\'s turn', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234>' , '<@123>');
            duel.getCurrentPlayer = sinon.stub().returns({name : '<@123>'})
            assert.strictEqual(duel.isPlayerTurn('<@1234>'), false);
        });
    });

    describe('getCurrentPlayer', () => {
        it('should return the player who\'s turn it is', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234>' , '<@123>');
            duel.turnPlayer = 1;
            assert.strictEqual(duel.getCurrentPlayer(), '<@123>');
        });
    });

    describe('getCurrentPlayer', () => {
        it('should return the player who\'s turn it is', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234>' , '<@123>');
            duel.turnPlayer = 1;
            assert.strictEqual(duel.getOtherPlayer(), '<@1234>');
        });
    });

    describe('displayStatus', () => {
        it('should return a playing status if playing', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.isPlaying = sinon.stub().returns(true);
            duel.displayPlaying = sinon.stub();
            let msg = 'abc';
            duel.displayStatus(msg);
            assert(duel.displayPlaying.calledWith(msg));
        });

        it('should return a waiting status if not playing', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.isPlaying = sinon.stub().returns(false);
            duel.displayWaiting = sinon.stub();
            let msg = 'abc';
            duel.displayStatus(msg);
            assert(duel.displayWaiting.calledWith(msg));
        });
    });

    describe('displayWaiting', () => {
        it('should rsend an embed with the players', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            let msg = {
                channel : {send : sinon.stub()}
            };
            duel.displayWaiting(msg);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].description, "<@123>, you are currently waiting for your partner to accept your challenge.");
            assert.strictEqual(msg.channel.send.getCall(0).args[0].fields[0].name, "Waiting List");
            assert.strictEqual(msg.channel.send.getCall(0).args[0].fields[0].value, "<@1234> you have been challenged to a Bondage Arena duel! Write `!accept` to accept or `!cancel` to decline.");
        });
    });

    describe('displayPlaying', () => {
        it('should send an embed with the players', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push({
                getClassName : sinon.stub().returns('Skunk Warlock'),
                name : '<@123>',
                restraints : [],
                effects : []
            }, {
                getClassName : sinon.stub().returns('Rubber Mage'),
                name : '<@1234>',
                restraints : [{
                    getName: sinon.stub().returns('Latex Mittens'),
                    getLocation: sinon.stub().returns('Arms'),
                    getDifficulty: sinon.stub().returns('Extreme'),
                    getDescription: sinon.stub().returns('The best kind of restraint ever'),
                },{
                    getName: sinon.stub().returns('Latex Straitjacket'),
                    getLocation: sinon.stub().returns('Body'),
                    getDifficulty: sinon.stub().returns('Impossible'),
                    getDescription: sinon.stub().returns('Also the best kind of restraint ever'),
                }],
                effects : [{
                    getName: sinon.stub().returns('Hidden'),
                    hidden : true,
                    display : sinon.stub().returns('This status effect is pointless!')
                },{
                    getName: sinon.stub().returns('Seduced'),
                    display : sinon.stub().returns('The latex is too tight and shiny for you to think about anything else!')
                }]
            });
            let msg = {
                channel : {send : sinon.stub()}
            };
            duel.displayPlaying(msg);
            assert.strictEqual(msg.channel.send.getCall(0).args[0].fields[0].name, "Player #1");
            assert.strictEqual(msg.channel.send.getCall(0).args[0].fields[0].value, "**<@123>**\n Class : Skunk Warlock");
            assert.strictEqual(msg.channel.send.getCall(1).args[0].fields[0].name, "Restraints");
            assert.strictEqual(msg.channel.send.getCall(1).args[0].fields[0].value, "<@123>");
            assert.strictEqual(msg.channel.send.getCall(2).args[0].fields[0].name, "Status Effects");
            assert.strictEqual(msg.channel.send.getCall(2).args[0].fields[0].value, "<@123>");
            assert.strictEqual(msg.channel.send.getCall(3).args[0].fields[0].name, "Player #2");
            assert.strictEqual(msg.channel.send.getCall(3).args[0].fields[0].value, "**<@1234>**\n Class : Rubber Mage");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[0].name, "Restraints");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[0].value, "<@1234>");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[1].name, "Latex Mittens");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[1].value, "Arms - Extreme - The best kind of restraint ever");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[2].name, "Latex Straitjacket");
            assert.strictEqual(msg.channel.send.getCall(4).args[0].fields[2].value, "Body - Impossible - Also the best kind of restraint ever");
            assert.strictEqual(msg.channel.send.getCall(5).args[0].fields[0].name, "Status Effects");
            assert.strictEqual(msg.channel.send.getCall(5).args[0].fields[0].value, "<@1234>");
            assert.strictEqual(msg.channel.send.getCall(5).args[0].fields[1].name, "Seduced");
            assert.strictEqual(msg.channel.send.getCall(5).args[0].fields[1].value, "The latex is too tight and shiny for you to think about anything else!");
        });
    });

    describe('getTurnCount', () => {
        it('should return turn number', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push('<@1234>' , '<@123>');
            duel.turn = 6;
            assert.strictEqual(duel.getTurnCount(), 3);
        });
    });

    describe('getPlayersWithoutClass', () => {
        it('should return players without a class', () => {
            let duel = new Duel('<@123>', '<@1234>', {});
            duel.playerstates.push({class : null}, {class : 'Wizard'});
            assert.strictEqual(duel.getPlayersWithoutClass().length, 1);
        });
    });
});