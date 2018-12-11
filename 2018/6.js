const input = require('./input5');

const parseInput = (inputString) => {
  const inputArray = inputString.split(' ');
  const id = inputArray[0];
  const startingCoordinates = inputArray[2].slice(0, -1).split(',');
  const size = inputArray[3].split('x');
  return [id, startingCoordinates, size];
};


const applyInput = (id, startingCoordinates, size, hash, rejectedIds) => {
  const localHash = hash;
  const localRejectedIds = rejectedIds;
  for (let i = 0; i < size[1]; i += 1) {
    const row = parseInt(startingCoordinates[1], 10) + i;
    for (let j = 1; j <= size[0]; j += 1) {
      const column = parseInt(startingCoordinates[0], 10) + j;
      if (localHash[`${row},${column}`]) {
        localRejectedIds.push(id);
        localRejectedIds.push(localHash[`${row},${column}`]);
      } else {
        localHash[`${row},${column}`] = id;
      }
    }
  }
  return [localHash, localRejectedIds];
};

let hash = {};
let rejectedIds = [];
const allIds = [];
input.forEach((val) => {
  const [id, startingCoordinates, size] = parseInput(val);
  allIds.push(id);
  [hash, rejectedIds] = applyInput(id, startingCoordinates, size, hash, rejectedIds);
});
const mySet = [...new Set(rejectedIds)];

for (let i = 0; i < allIds.length; i += 1) {
  if (mySet.indexOf(allIds[i]) === -1) {
    console.log(allIds[i]);
  }
}
