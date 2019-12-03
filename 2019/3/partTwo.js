const fs = require('fs');
const path = require('path');

const [dataOne, dataTwo] = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');
const dataOneArray = dataOne.split(',');
const dataTwoArray = dataTwo.split(',');
let dataOneSteps = 0;
const pointsTouchedByA = {};
let currentPosition = [0, 0];
const intersectionPoints = [];
for (let i = 0; i < dataOneArray.length; i += 1) {
  const direction = dataOneArray[i][0];
  const value = parseInt(dataOneArray[i].substring(1), 10);
  if (direction === 'R') {
    for (let j = 1; j <= value; j += 1) {
      dataOneSteps += 1;
      pointsTouchedByA[`${currentPosition[0] + j}_${currentPosition[1]}`] = { dataOneSteps };
    }
    currentPosition = [currentPosition[0] + value, currentPosition[1]];
  } else if (direction === 'L') {
    for (let j = 1; j <= value; j += 1) {
      dataOneSteps += 1;
      pointsTouchedByA[`${currentPosition[0] - j}_${currentPosition[1]}`] = { dataOneSteps };
    }
    currentPosition = [currentPosition[0] - value, currentPosition[1]];
  } else if (direction === 'U') {
    for (let j = 1; j <= value; j += 1) {
      dataOneSteps += 1;
      pointsTouchedByA[`${currentPosition[0]}_${currentPosition[1] + j}`] = { dataOneSteps };
    }
    currentPosition = [currentPosition[0], currentPosition[1] + value];
  } else if (direction === 'D') {
    for (let j = 1; j <= value; j += 1) {
      dataOneSteps += 1;
      pointsTouchedByA[`${currentPosition[0]}_${currentPosition[1] - j}`] = { dataOneSteps };
    }
    currentPosition = [currentPosition[0], currentPosition[1] - value];
  }
}

currentPosition = [0, 0];
let dataTwoSteps = 0;
for (let i = 0; i < dataTwoArray.length; i += 1) {
  const direction = dataTwoArray[i][0];
  const value = parseInt(dataTwoArray[i].substring(1), 10);
  if (direction === 'R') {
    for (let j = 1; j <= value; j += 1) {
      dataTwoSteps += 1;
      const pos = `${currentPosition[0] + j}_${currentPosition[1]}`;
      if (pointsTouchedByA[pos]) {
        pointsTouchedByA[pos].dataTwoSteps = dataTwoSteps;
        intersectionPoints.push(pointsTouchedByA[pos]);
      }
    }
    currentPosition = [currentPosition[0] + value, currentPosition[1]];
  } else if (direction === 'L') {
    for (let j = 1; j <= value; j += 1) {
      dataTwoSteps += 1;
      const pos = `${currentPosition[0] - j}_${currentPosition[1]}`;
      if (pointsTouchedByA[pos]) {
        pointsTouchedByA[pos].dataTwoSteps = dataTwoSteps;
        intersectionPoints.push(pointsTouchedByA[pos]);
      }
    }
    currentPosition = [currentPosition[0] - value, currentPosition[1]];
  } else if (direction === 'U') {
    for (let j = 1; j <= value; j += 1) {
      dataTwoSteps += 1;
      const pos = `${currentPosition[0]}_${currentPosition[1] + j}`;
      if (pointsTouchedByA[pos]) {
        pointsTouchedByA[pos].dataTwoSteps = dataTwoSteps;
        intersectionPoints.push(pointsTouchedByA[pos]);
      }
    }
    currentPosition = [currentPosition[0], currentPosition[1] + value];
  } else if (direction === 'D') {
    for (let j = 1; j <= value; j += 1) {
      dataTwoSteps += 1;
      const pos = `${currentPosition[0]}_${currentPosition[1] - j}`;
      if (pointsTouchedByA[pos]) {
        pointsTouchedByA[pos].dataTwoSteps = dataTwoSteps;
        intersectionPoints.push(pointsTouchedByA[pos]);
      }
    }
    currentPosition = [currentPosition[0], currentPosition[1] - value];
  }
}
let min = Infinity;
console.log(intersectionPoints);
intersectionPoints.forEach((val) => {
  const sum = val.dataOneSteps + val.dataTwoSteps;
  // console.log(sum);
  if (sum < min) {
    console.log(sum, val);
    min = sum;
  }
});
console.log('***********');
console.log(min);
