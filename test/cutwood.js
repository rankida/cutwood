'use strict';

const lab = module.exports.lab = require('lab').script();
const code = require('code');
const cutwood = require('../lib/cutwood');

const describe = lab.experiment;
const expect = code.expect;
const it = lab.test;

describe('CutWood', () => {
  describe('working?', () => {
    it('can input', (done) => {
      cutwood
        .input(['one', 'two', 'three'])
        .toArray((err, objects) => {
          expect(err).to.not.exist();
          expect(objects).to.equal(['one', 'two', 'three']);
          done();
        });
    });
    it('can echo strings', (done) => {
      cutwood
        .input(['one', 'two', 'three'])
        .echo().echo()
        .toArray((err, objects) => {
          expect(err).to.not.exist();
          expect(objects).to.have.length(3);
          expect(objects[0]).to.equal('one');
          expect(objects).to.equal(['one', 'two', 'three']);
          done();
        });
    });
    it('can echo objects', (done) => {
      cutwood
        .input([{ one: 1 }, { two: 2 }, { three: 3 }])
        .echo().echo()
        .toArray((err, objects) => {
          expect(err).to.not.exist();
          expect(objects).to.have.length(3);
          expect(objects).to.equal([{ one: 1 }, { two: 2 }, { three: 3 }]);
          done();
        });
    });
    it('can split', (done) => {
      cutwood
        .input(['one:two:three', 'a:b:c'])
        .split(':')
        .toArray((err, objects) => {
          expect(err).to.not.exist();
          expect(objects).to.equal([['one', 'two', 'three'], ['a', 'b', 'c']]);
          done();
        });
    });
    describe('evict', () => {
      it('can evict on a regex', (done) => {
        cutwood
          .input(['one', 'two', 'three', 'four'])
          .evict(/^t/)
          .toArray((err, objects) => {
            expect(err).to.not.exist();
            expect(objects).to.equal(['one', 'four']);
            done();
          });
      });
    });
  });
});
