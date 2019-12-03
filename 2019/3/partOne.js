// const dataOneArray = ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'];
// const dataTwoArray = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'];

// const a1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
// const b1 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

const fs = require('fs');
const path = require('path');

const [dataOne, dataTwo] = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');
const dataOneArray = dataOne.split(',');
const dataTwoArray = dataTwo.split(',');


// const a = a1.split(',');
// const b = b1.split(',');
const pointsTouchedByA = {};
let currentPosition = [0, 0];
const intersectionPoints = [];
for (let i = 0; i < dataOneArray.length; i += 1) {
  const direction = dataOneArray[i][0];
  const value = parseInt(dataOneArray[i].substring(1), 10);
  if (direction === 'R') {
    for (let j = 1; j <= value; j += 1) {
      pointsTouchedByA[`${currentPosition[0] + j}_${currentPosition[1]}`] = true;
    }
    currentPosition = [currentPosition[0] + value, currentPosition[1]];
  } else if (direction === 'L') {
    for (let j = 1; j <= value; j += 1) {
      pointsTouchedByA[`${currentPosition[0] - j}_${currentPosition[1]}`] = true;
    }
    currentPosition = [currentPosition[0] - value, currentPosition[1]];
  } else if (direction === 'U') {
    for (let j = 1; j <= value; j += 1) {
      pointsTouchedByA[`${currentPosition[0]}_${currentPosition[1] + j}`] = true;
    }
    currentPosition = [currentPosition[0], currentPosition[1] + value];
  } else if (direction === 'D') {
    for (let j = 1; j <= value; j += 1) {
      pointsTouchedByA[`${currentPosition[0]}_${currentPosition[1] - j}`] = true;
    }
    currentPosition = [currentPosition[0], currentPosition[1] - value];
  }
}

currentPosition = [0, 0];
for (let i = 0; i < dataTwoArray.length; i += 1) {
  const direction = dataTwoArray[i][0];
  const value = parseInt(dataTwoArray[i].substring(1), 10);
  if (direction === 'R') {
    for (let j = 1; j <= value; j += 1) {
      const pos = `${currentPosition[0] + j}_${currentPosition[1]}`;
      if (pointsTouchedByA[pos]) {
        intersectionPoints.push(pos);
      }
    }
    currentPosition = [currentPosition[0] + value, currentPosition[1]];
  } else if (direction === 'L') {
    for (let j = 1; j <= value; j += 1) {
      const pos = `${currentPosition[0] - j}_${currentPosition[1]}`;
      if (pointsTouchedByA[pos]) {
        intersectionPoints.push(pos);
      }
    }
    currentPosition = [currentPosition[0] - value, currentPosition[1]];
  } else if (direction === 'U') {
    for (let j = 1; j <= value; j += 1) {
      const pos = `${currentPosition[0]}_${currentPosition[1] + j}`;
      if (pointsTouchedByA[pos]) {
        intersectionPoints.push(pos);
      }
    }
    currentPosition = [currentPosition[0], currentPosition[1] + value];
  } else if (direction === 'D') {
    for (let j = 1; j <= value; j += 1) {
      const pos = `${currentPosition[0]}_${currentPosition[1] - j}`;
      if (pointsTouchedByA[pos]) {
        intersectionPoints.push(pos);
      }
    }
    currentPosition = [currentPosition[0], currentPosition[1] - value];
  }
}
let min = Infinity;
console.log(intersectionPoints);
intersectionPoints.forEach((val) => {
  const [l, r] = val.split('_');
  const sum = Math.abs(parseInt(l, 10)) + Math.abs(parseInt(r, 10));
  // console.log(sum);
  if (sum < min) {
    console.log(sum, val);
    min = sum;
  }
});
console.log('***********');
console.log(min);
