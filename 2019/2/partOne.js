const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split(',');
const intData = data.map((val) => parseInt(val, 10));
intData[1] = 12;
intData[2] = 2;
for (let i = 0; i < intData.length; i += 4) {
  if (intData[i] === 99) {
    break;
  } else if (intData[i] === 1) {
    intData[intData[i + 3]] = intData[intData[i + 1]] + intData[intData[i + 2]];
  } else if (intData[i] === 2) {
    intData[intData[i + 3]] = intData[intData[i + 1]] * intData[intData[i + 2]];
  } else {
    console.log('something went wrong', intData[i]);
  }
}
console.log(intData);
