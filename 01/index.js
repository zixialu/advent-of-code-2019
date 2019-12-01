const fs = require('fs');

/**
 * Fuel required to launch a given module is based on its mass. Specifically, to
 * find the fuel required for a module, take its mass, divide by three, round
 * down, and subtract 2.
 */
const getFuelRequired = mass => ((mass / 3) | 0) - 2;

const getTotalFuelRequired = () => {
  try {
    const data = fs.readFileSync('./input.txt', 'utf8');
    const masses = data.split('\n')
      .filter(line => line !== '')
      .map(m => Number(m));
    return masses.reduce((total, mass) => total + getFuelRequired(mass), 0);
  } catch (err) {
    console.error(err);
  }
};

console.log(getTotalFuelRequired());
