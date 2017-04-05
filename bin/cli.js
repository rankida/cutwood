#!/usr/bin/env node

const profileLoader = require('../lib/profile-loader');

const conf = {};
const config = require('rc')('cutwood', {
  profiles: {
    default: null
  }
});

const profileName = config.p || config.profile || (config._.length && config._[0]) || null;

const profile = profileLoader.load(profileName);

const { CutWood } = require('../lib/cutwood');

var stdin = process.openStdin();

profile(new CutWood(stdin));

stdin.on('end', function () {
  console.log('Cutwood: end');
});
