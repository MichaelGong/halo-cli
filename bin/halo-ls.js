#!/usr/bin/env node

const json = require('../projecttemplate.json');
const {
  customConfig,
} = require('../lib/setCustomConfig');
const util = require('../lib/util');

const config = Object.assign(json, customConfig);
Object.keys(config).forEach((key) => {
  console.log(`  ${key}${util.line(key, 12)}${config[key].registry}`);
});
