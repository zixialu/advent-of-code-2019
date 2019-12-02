const run = (intcode) => {
  const OPS = {
    1: {
      argc: 4,
      compute: (i, j, k) => {
        intcode[k] = intcode[i] + intcode[j];
      },
    },
    2: {
      argc: 4,
      compute: (i, j, k) => {
        intcode[k] = intcode[i] * intcode[j];
      },
    },
    99: {
      argc: 1,
      compute: null,
      exit: true,
    },
  };

  for (
    let idx = 0;
    !OPS[intcode[idx]].exit;
    idx += OPS[intcode[idx]].argc
  ) {
    const argv = intcode
      .slice(idx + 1, idx + OPS[intcode[idx]].argc);
    OPS[intcode[idx]].compute(...argv);
  }

  return intcode;
}

// before running the program, replace position 1 with the value 12 and replace
// position 2 with the value 2
const preprocessIntcode = intcode => {
  intcode[1] = 12;
  intcode[2] = 2;
  return intcode;
}

module.exports = { run, preprocessIntcode };
