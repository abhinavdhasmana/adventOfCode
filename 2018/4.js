const input = require('./input3');

const hasExactlyOneDiff = (inputOne, inputTwo) => {
  let count = 0;
  for (let i = 0; i < inputOne.length; i += 1) {
    if (inputOne[i] !== inputTwo[i]) {
      count += 1;
    }
    if (count === 2) {
      return false;
    }
  }
  return count === 1;
};

const findCorrectBoxIds = (inputData) => {
  for (let i = 0; i < inputData.length - 1; i += 1) {
    for (let j = i + 1; j < inputData.length; j += 1) {
      if (hasExactlyOneDiff(inputData[i], inputData[j])) {
        return [inputData[i], inputData[j]];
      }
    }
  }
  return null;
};

const findCommonLetters = (inputData) => {
  const [stringOne, stringTwo] = findCorrectBoxIds(inputData);
  // findCorrectBoxIds(inputData);
  let finalString = '';
  for (let i = 0; i < stringOne.length; i += 1) {
    if (stringOne[i] === stringTwo[i]) {
      finalString += stringOne[i];
    }
  }
  return finalString;
};

console.log(findCommonLetters(input));
