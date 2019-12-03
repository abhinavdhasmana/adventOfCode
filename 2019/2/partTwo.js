const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split(',');
const intDataCopy = data.map((val) => parseInt(val, 10));

for (let i = 0; i < 100; i += 1) {
  for (let j = 0; j < 100; j += 1) {
    const intData = [...intDataCopy];
    intData[1] = i;
    intData[2] = j;
    for (let k = 0; k < intData.length; k += 4) {
      if (intData[k] === 99) {
        break;
      } else if (intData[k] === 1) {
        intData[intData[k + 3]] = intData[intData[k + 1]] + intData[intData[k + 2]];
      } else if (intData[k] === 2) {
        intData[intData[k + 3]] = intData[intData[k + 1]] * intData[intData[k + 2]];
      } else {
        console.log('something went wrong', intData[k]);
      }
    }
    if (intData[0] === 19690720) {
      console.log(i, j);
      console.log((100 * i) + j);
    }
  }
}
