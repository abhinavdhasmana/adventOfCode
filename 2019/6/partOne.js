const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, 'partOneData.txt')).toString().split('\n');

const planetFollowers = {};
const planetOrbitCount = {};

const updateOrbitsCount = (planet, increment) => {
  planetOrbitCount[planet] = increment + 1;
  if (planetFollowers[planet]) {
    planetFollowers[planet].forEach((planet2) => {
      updateOrbitsCount(planet2, planetOrbitCount[planet]);
    });
  }
};

data.forEach((input) => {
  const [source, follower] = input.split(')');
  planetOrbitCount[follower] = 1
    + (planetOrbitCount[source] || 0);
  // + (planetOrbitCount[follower] || 0);

  if (planetFollowers[follower]) {
    planetFollowers[follower].forEach((planet3) => {
      updateOrbitsCount(planet3, planetOrbitCount[follower]);
    });
  }
  if (planetFollowers[source]) {
    planetFollowers[source].push(follower);
  } else {
    planetFollowers[source] = [follower];
  }
});
const values = Object.values(planetOrbitCount).reduce((a, b) => a + b, 0);
console.log(values);
