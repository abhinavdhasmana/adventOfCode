const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');

const planetFollowing = {};
const planetFollowers = {};
const allPlanetsFollowing = (planet) => {
  const list = [];
  let currentPlanet = planet;
  while (planetFollowing[currentPlanet]) {
    // console.log(planetFollowing[currentPlanet][0]);
    list.push(planetFollowing[currentPlanet][0]);
    [currentPlanet] = planetFollowing[currentPlanet];
  }
  return list;
};


data.forEach((input) => {
  const [source, follower] = input.split(')');
  if (planetFollowing[follower]) {
    planetFollowing[follower].push(source);
  } else {
    planetFollowing[follower] = [source];
  }
});

console.log('startPlanet', planetFollowing.YOU);
console.log('destinationPlanet', planetFollowing.SAN);
const startPlanet = planetFollowing.YOU;
const destinationPlanet = planetFollowing.SAN;

const listOne = allPlanetsFollowing(startPlanet);
const listTwo = allPlanetsFollowing(destinationPlanet);

let firstIntersection = '';

for (let i = 0; i < listOne.length; i += 1) {
  if (listTwo.includes(listOne[i])) {
    firstIntersection = listOne[i].toString();
    break;
  }
}
console.log(listOne.indexOf(firstIntersection) + listTwo.indexOf(firstIntersection) + 2);
