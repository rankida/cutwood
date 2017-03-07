'use strict';

const fromArray = require('read-stream/array');
const toArray = require('write-stream/array');
const { Transform, PassThrough } = require('stream');

class CutWood {
  constructor (stream) {
    this.stream = stream;
  }

  echo () {
    const pass = new PassThrough({ objectMode: true });
    this.stream = this.stream.pipe(pass);
    return this;
  }

  split (str) {
    const transform = new Transform({
      objectMode: true,
      transform (chunk, encoding, callback) {
        callback(null, chunk.split(str));
      }
    });
    this.stream = this.stream.pipe(transform);
    return this;
  }

  toArray (func) {
    this.stream.pipe(toArray((a) => {
      func(null, a);
    }));
    return this;
  }
}

const cutwood = {};

cutwood.input = (input) => new CutWood(fromArray(input));

module.exports = cutwood;
