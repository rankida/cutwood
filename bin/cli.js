#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const profileLoader = require('../lib/profile-loader');
const config = require('rc')('cutwood', {});

const profileName = argv.profile || argv.p || config.p || config.profile || 'default';

const settingsPath = path.join(process.cwd(), '.cutwood.js');
if (fs.existsSync(settingsPath)) {
  const settings = require(settingsPath);
  console.log('CW::settings', settings);
  profileLoader.load(settings);
}

console.log("CW::profile", profileName);
const profile = profileLoader.get(profileName);

const { CutWood } = require('../lib/cutwood');

var stdin = process.openStdin();

profile(new CutWood(stdin));

stdin.on('end', function () {
  console.log('Cutwood: end');
});
