const fs = require('fs');

/**
 * Fuel required to launch a given module is based on its mass. Specifically, to
 * find the fuel required for a module, take its mass, divide by three, round
 * down, and subtract 2.
 */
const getFuelRequired = mass => ((mass / 3) | 0) - 2;

const getTotalFuelRequired = (filePath) => {
  try {
    const data = fs.readFileSync(filePath || './input.txt', 'utf8');
    const masses = data.split('\n')
      .filter(line => line !== '')
      .map(m => Number(m));
    const totalFuel = masses
      .reduce((total, mass) => total + getFuelRequired(mass), 0);
    return totalFuel < 0 ? 0 : totalFuel;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getFuelRequired, getTotalFuelRequired };
