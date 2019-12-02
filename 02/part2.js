const { run } = require('./part1');

const setNounAndVerb = (intcode, noun, verb) => {
  intcode[1] = noun;
  intcode[2] = verb;
};

const findNounAndVerbForOutput = (target, intcode) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const attempt = [...intcode];
      setNounAndVerb(attempt, noun, verb);
      const [output] = run(attempt);
      if (output === target) return { noun, verb };
    }
  }

  return undefined;
};

const calculateNounVerbScore = (noun, verb) => 100 * noun + verb;

module.exports = {
  setNounAndVerb,
  findNounAndVerbForOutput,
  calculateNounVerbScore,
};
