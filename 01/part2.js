const fs = require('fs');
const { getFuelRequired } = require('./part1');

const getCorrectedTotalMass = (mass) => {
  const fuelRequiredForFuel = getFuelRequired(mass);

  if (fuelRequiredForFuel <= 0) return mass;
  return mass + getCorrectedTotalMass(fuelRequiredForFuel);
};

const getTotalCorrectedFuelRequired = (filePath) => {
  try {
    const data = fs.readFileSync(filePath || './input.txt', 'utf8');
    const masses = data.split('\n')
      .filter(line => line !== '')
      .map(m => Number(m));
    const totalFuel = masses
      .reduce((total, mass) => total + getCorrectedTotalMass(mass) - mass, 0);
    return totalFuel < 0 ? 0 : totalFuel;
  } catch (err) {
    console.error(err);
  }
};

console.log(getTotalCorrectedFuelRequired());
