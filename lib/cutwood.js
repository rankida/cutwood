'use strict';

const fromArray = require('read-stream/array');
const toArray = require('write-stream/array');
const { Transform, PassThrough } = require('stream');
const chalk = require('chalk');

function transform (cw, transform) {
  cw.stream = cw.stream.pipe(new Transform({
    objectMode: true,
    transform
  }));
  return cw;
}

class CutWood {
  constructor (stream) {
    this.stream = stream;
  }

  echo () {
    const pass = new PassThrough({ objectMode: true });
    this.stream = this.stream.pipe(pass);
    return this;
  }

  write () {
    this.stream.pipe(process.stdout);
    return this;
  }

  split (str) {
    return transform(this, (chunk, encoding, callback) => {
      callback(null, chunk.split(str));
    });
  }

  evict (criteria) {
    const shouldEvict = (chunk) => criteria.test(chunk);
    return transform(this, (chunk, encoding, callback) => {
      shouldEvict(chunk) ? callback() : callback(null, chunk);
    });
  }

  colour (criteria, colour) {
    const test = (chunk) => criteria.test(chunk);
    return transform(this, (chunk, encoding, callback) => {
      test(chunk) ? callback(null, chalk[colour](chunk)) : callback(null, chunk);
    });
  }

  toArray (func) {
    this.stream.pipe(toArray((a) => {
      func(null, a);
    }));
    return this;
  }
}

CutWood.color = CutWood.colour;

const cutwood = {};

cutwood.input = (input) => new CutWood(fromArray(input));

module.exports = cutwood;
module.exports.CutWood = CutWood;
