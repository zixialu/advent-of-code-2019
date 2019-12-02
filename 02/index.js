const { run, preprocessIntcode } = require('./part1');
const fs = require('fs');

// Part 1
const data = fs.readFileSync('./input.txt', 'utf8');
const intcode = data.split(',').map(str => Number(str));
preprocessIntcode(intcode);
console.log(run(intcode)[0]);
