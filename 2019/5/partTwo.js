const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split(',');
const intData = data.map((val) => parseInt(val, 10));
const input = 5;

const deconstructOpsCode = (number) => {
  const opsCode = number % 100;
  const m1 = parseInt((number / 100), 10) % 10;
  const m2 = parseInt((number / 1000), 10) % 10;
  const m3 = parseInt((number / 10000), 10) % 10;
  return {
    opsCode, m1, m2, m3,
  };
};
const getParameterFromMode = (m, value) => {
  if (m === 0) {
    // console.log('value', value);
    return intData[value];
  }
  if (m === 1) {
    return value;
  }
  console.log('something went wrong in get value from mode');
  return null;
};

// if (m === 0) {
//   return intData[value];
// }
const getThirdParameterFromMode = (m, value) => value;
// const getThirdParameterFromMode = (m, value) => {
//   if (m === 0) {
//     return intData[value];
//   }
//   return value;
// };
const putAtIndexIfPositive = (index, value) => {
  if (index >= 0) {
    intData[index] = value;
  }
};

let output;
for (let i = 0; i < intData.length; i += 4) {
  console.log('********************', i);
  console.log(intData);
  const {
    opsCode, m1, m2, m3,
  } = deconstructOpsCode(intData[i]);
  console.log('opsCode, m1, m2, m3', opsCode, m1, m2, m3);
  const firstParameter = getParameterFromMode(m1, intData[i + 1]);
  const secondParameter = getParameterFromMode(m2, intData[i + 2]);
  const thirdParameter = getThirdParameterFromMode(m3, intData[i + 3]);
  console.log(`firstParameter ${firstParameter} secondParameter ${secondParameter} thirdParameter ${thirdParameter}`);
  if (opsCode === 99) {
    break;
  } else if (opsCode === 1) {
    const sum = firstParameter + secondParameter;
    intData[thirdParameter] = sum;
  } else if (opsCode === 2) {
    const product = firstParameter * secondParameter;
    intData[thirdParameter] = product;
  } else if (opsCode === 3) {
    intData[intData[i + 1]] = input;
    i -= 2;
  } else if (opsCode === 4) {
    output = firstParameter;
    i -= 2;
  } else if (opsCode === 5) {
    if (firstParameter !== 0) {
      i = secondParameter;
      i -= 4;
    } else {
      i -= 1;
    }
  } else if (opsCode === 6) {
    if (firstParameter === 0) {
      i = secondParameter;
      i -= 4;
    } else {
      i -= 1;
    }
  } else if (opsCode === 7) {
    if (firstParameter < secondParameter) {
      intData[thirdParameter] = 1;
    } else {
      intData[thirdParameter] = 0;
    }
  } else if (opsCode === 8) {
    if (firstParameter === secondParameter) {
      intData[thirdParameter] = 1;
    } else {
      intData[thirdParameter] = 0;
    }
  } else {
    console.log('something went wrong', i, opsCode, intData[i]);
  }
}
console.log('output', output);
