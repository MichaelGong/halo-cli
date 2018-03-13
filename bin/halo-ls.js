#!/usr/bin/env node

const json = require('../projecttemplate.json');
const util = require('../lib/util');

Object.keys(json).forEach((key) => {
  console.log(`  ${key}${util.line(key, 10)}${json[key]}`);
});
