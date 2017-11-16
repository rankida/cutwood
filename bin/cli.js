#!/usr/bin/env node

const argv = require('yargs').argv;

const profileLoader = require('../lib/profile-loader');

const config = require('rc')('cutwood', {});

const profileName = argv.profile || argv.p || config.p || config.profile || null;

console.log('Loading cutwood profile', profileName);
const profile = profileLoader.load(profileName);

const { CutWood } = require('../lib/cutwood');

var stdin = process.openStdin();

profile(new CutWood(stdin));

stdin.on('end', function () {
  console.log('Cutwood: end');
});
