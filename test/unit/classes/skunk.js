/* global describe, it */
const assert = require('assert');
const SkunkWarlock = require('../../../src/classes/skunk');
const sinon = require('sinon');

describe('Skunk Warlock', function() {
    describe('constructor', function() {
        it('Should set basic data', function () {
            let skw = new SkunkWarlock();
            let name = skw.getClassName();
            assert.strictEqual(name, 'Skunk Warlock');
        });
    });

    describe('getSpellList', function() {
        it('should return all spells', function () {
            let skw = new SkunkWarlock();
            let spells = skw.getSpellList();
            assert.deepEqual(spells, ['latexmuzzle', 'latexheels', 'latexmittens', 'latexcorset', 'fullskunking']);
        });
    });

    describe('getSpellList', function() {
        it('should return all non spells', function () {
            let skw = new SkunkWarlock();
            let spells = skw.getNonSpellList();
            assert.deepEqual(spells, ['latexhug']);
        });
    });

    describe('getAllActions', function() {
        it('should return all actions except ultimate if it is before 4 turns', function () {
            let duelStub = {getTurnCount : sinon.stub().returns(2)};
            let skw = new SkunkWarlock();
            let spells = skw.getAllActions(duelStub);
            assert.deepEqual(spells, ['latexmuzzle', 'latexheels', 'latexmittens', 'latexcorset', 'latexhug']);
        });

        it('should return all actions except ultimate if it has been used', function () {
            let duelStub = {getTurnCount : sinon.stub().returns(5)};
            let skw = new SkunkWarlock();
            skw.actions['fullskunking'].used = true;
            let spells = skw.getAllActions(duelStub);
            assert.deepEqual(spells, ['latexmuzzle', 'latexheels', 'latexmittens', 'latexcorset', 'latexhug']);
        });

        it('should return all actions with ultimate', function () {
            let duelStub = {getTurnCount : sinon.stub().returns(5)};
            let skw = new SkunkWarlock();
            let spells = skw.getAllActions(duelStub);
            assert.deepEqual(spells, ['latexmuzzle', 'latexheels', 'latexmittens', 'latexcorset', 'latexhug', 'fullskunking']);
        });
    });

    describe('isSpell', function() {
        it('should return a spell as a spell', () => {
            let skw = new SkunkWarlock();
            let actual = skw.isSpell('latexmittens');
            assert.strictEqual(actual, true);
            actual = skw.isSpell('latexheels');
            assert.strictEqual(actual, true);
            actual = skw.isSpell('latexmuzzle');
            assert.strictEqual(actual, true);
            actual = skw.isSpell('latexcorset');
            assert.strictEqual(actual, true);
            actual = skw.isSpell('fullskunking');
            assert.strictEqual(actual, true);
        });

        it('should not return a spell as a spell', () => {
            let skw = new SkunkWarlock();
            let actual = skw.isSpell('latexhug');
            assert.strictEqual(actual, false);
        });
    });

    describe('isNonSpell', function() {
        it('should not return a spell as a non spell', () => {
            let skw = new SkunkWarlock();
            let actual = skw.isNonSpell('latexmittens');
            assert.strictEqual(actual, false);
            actual = skw.isNonSpell('latexheels');
            assert.strictEqual(actual, false);
            actual = skw.isNonSpell('latexmuzzle');
            assert.strictEqual(actual, false);
            actual = skw.isNonSpell('latexcorset');
            assert.strictEqual(actual, false);
            actual = skw.isNonSpell('fullskunking');
            assert.strictEqual(actual, false);
        });

        it('should return a non spell as a non spell', () => {
            let skw = new SkunkWarlock();
            let actual = skw.isNonSpell('latexhug');
            assert.strictEqual(actual, true);
        });
    });

    describe('getAction', () => {
        it('should return the tagged spell', () => {
            let skw = new SkunkWarlock();
            let actual = skw.getAction('latexmuzzle');
            assert.strictEqual(actual, skw.actions['latexmuzzle']);
        });
    });

});