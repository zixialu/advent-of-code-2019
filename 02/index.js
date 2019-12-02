const { run, preprocessIntcode } = require('./part1');
const {
  findNounAndVerbForOutput,
  calculateNounVerbScore,
} = require('./part2');
const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const intcode = data.split(',').map(str => Number(str));

// Part 1
// preprocessIntcode(intcode);
// console.log(run(intcode)[0]);

// Part 2
const TARGET = 19690720;
const { noun, verb } = findNounAndVerbForOutput(TARGET, intcode);
console.log(calculateNounVerbScore(noun, verb));
