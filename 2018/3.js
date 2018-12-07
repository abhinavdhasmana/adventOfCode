const inputValues = require('./input3.js');

const countTwoThreeOccurences = (inputString) => {
  const countHash = {};
  for (let i = 0; i < inputString.length; i += 1) {
    countHash[inputString[i]] = countHash[inputString[i]] ? countHash[inputString[i]] + 1 : 1;
  }
  const values = Object.values(countHash);
  const containsTwo = values.includes(2);
  const constainsThree = values.includes(3);
  return [containsTwo, constainsThree];
};

const calculateCheckSum = (input) => {
  let twoCounts = 0;
  let threeCounts = 0;
  for (let i = 0; i < input.length; i += 1) {
    const [two, three] = countTwoThreeOccurences(input[i]);
    twoCounts = two ? twoCounts + 1 : twoCounts;
    threeCounts = three ? threeCounts + 1 : threeCounts;
  }
  return twoCounts * threeCounts;
};

// console.log(input);
console.log(calculateCheckSum(inputValues));
