const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');
let totalFuel = 0;
data.forEach((mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  totalFuel += fuel;
});
console.log(totalFuel);