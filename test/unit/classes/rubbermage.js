/* global describe, it */
const assert = require('assert');
const RubberMage = require('../../../src/classes/rubbermage');
const sinon = require('sinon');

describe('RubberMage', function() {
    describe('constructor', function() {
        it('Should set basic data', function () {
            let rm = new RubberMage();
            let name = rm.getClassName();
            assert.strictEqual(name, 'RubberMage');
        });
    });

    describe('getSpellList', function() {
        it('should return all spells', function () {
            let rm = new RubberMage();
            let spells = rm.getSpellList();
            assert.deepEqual(spells, []);
        });
    });

    describe('getNonSpellList', function() {
        it('should return all non spells', function () {
            let rm = new RubberMage();
            let spells = rm.getNonSpellList();
            assert.deepEqual(spells, ['rubberball', 'rubbertouch']);
        });
    });

    describe('getAllActions', function() {
        it('should return all actions except ultimate if it is before 4 turns', function () {
            let duelStub = {getTurnCount : sinon.stub().returns(2)};
            let rm = new RubberMage();
            let spells = rm.getAllActions(duelStub);
            assert.deepEqual(spells, ['rubberball', 'rubbertouch', 'creepingrubber']);
        });

        it('should return all actions with ultimate', function () {
            let duelStub = {getTurnCount : sinon.stub().returns(5)};
            let rm = new RubberMage();
            let spells = rm.getAllActions(duelStub);
            assert.deepEqual(spells, ['rubberball', 'rubbertouch', 'creepingrubber']);
        });
    });

});