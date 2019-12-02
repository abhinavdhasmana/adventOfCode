const fs = require('fs');
const path = require('path');

const recusriveFule = (mass) => {
  if (mass <= 8) {
    return 0;
  }
  const fuel = Math.floor(mass / 3) - 2;
  return fuel + recusriveFule(fuel);
};

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');
let totalFuel = 0;
data.forEach((mass) => {
  const fuel = recusriveFule(mass);
  totalFuel += fuel;
});
console.log(totalFuel);
