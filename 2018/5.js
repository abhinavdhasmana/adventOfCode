const input = require('./input5');

const parseInput = (inputString) => {
  const inputArray = inputString.split(' ');
  const startingCoordinates = inputArray[2].slice(0, -1).split(',');
  const size = inputArray[3].split('x');
  return [startingCoordinates, size];
};

const applyInput = (startingCoordinates, size, hash) => {
  const localHash = hash;
  for (let i = 0; i < size[1]; i += 1) {
    const row = parseInt(startingCoordinates[1], 10) + i;
    for (let j = 1; j <= size[0]; j += 1) {
      const column = parseInt(startingCoordinates[0], 10) + j;
      localHash[`${row},${column}`] = localHash[`${row},${column}`] ? localHash[`${row},${column}`] + 1 : 1;
    }
  }
  return localHash;
};

const collidingArea = hash => Object.values(hash).reduce((acc, val) => {
  let tempAcc = acc;
  if (val > 1) {
    tempAcc += 1;
  }
  return tempAcc;
}, 0);

let hash = {};
input.forEach((val) => {
  const [startingCoordinates, size] = parseInput(val);
  hash = applyInput(startingCoordinates, size, hash);
});
console.log(hash);
const total = collidingArea(hash);
console.log(total);
