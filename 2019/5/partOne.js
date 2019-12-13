const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split(',');
const intData = data.map((val) => parseInt(val, 10));

const deconstructOpsCode = (number) => {
  const opsCode = number % 100;
  const m1 = parseInt((number / 100), 10) % 10;
  const m2 = parseInt((number / 1000), 10) % 10;
  const m3 = parseInt((number / 10000), 10) % 10;
  return {
    opsCode, m1, m2, m3,
  };
};

// console.log('intData', intData);

const getValueFromMode = (m, value) => {
  if (m === 0) {
    return intData[value];
  }
  if (m === 1) {
    return value;
  }
  console.log('something went wrong in get value from mode');
  return null;
};
const input = 1;
let output;
for (let i = 0; i < intData.length; i += 4) {
  const {
    opsCode, m1, m2, m3,
  } = deconstructOpsCode(intData[i]);
  // console.log('processing codes:', opsCode, m1, m2, m3);
  if (opsCode === 99) {
    break;
  } else if (opsCode === 1) {
    const v1 = getValueFromMode(m1, intData[i + 1]);
    const v2 = getValueFromMode(m2, intData[i + 2]);
    const product = v1 + v2;
    if (m3 === 0) {
      intData[intData[i + 3]] = product;
    } else {
      intData[i + 3] = product;
    }
  } else if (opsCode === 2) {
    const v1 = getValueFromMode(m1, intData[i + 1]);
    const v2 = getValueFromMode(m2, intData[i + 2]);
    const product = v1 * v2;
    if (m3 === 0) {
      intData[intData[i + 3]] = product;
    } else {
      intData[i + 3] = product;
    }
  } else if (opsCode === 3) {
    const v1 = getValueFromMode(m3, intData[i + 1]);
    intData[v1] = input;
    i -= 2;
  } else if (opsCode === 4) {
    output = intData[intData[i + 1]];
    i -= 2;
  } else {
    console.log('something went wrong', i, opsCode, intData[i]);
  }
}
console.log(output);
