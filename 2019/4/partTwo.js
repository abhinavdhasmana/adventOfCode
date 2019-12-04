// const conditionMatch = (number) => {
//   if ((number < 402328) || (number > 864247)) {
//     return false;
//   }
//   return true;
// };
// let count = 0;
// for (let i = 4; i <= 9; i += 1) {
//   for (let j = i; j <= 9; j += 1) {
//     for (let k = j; k <= 9; k += 1) {
//       for (let l = k; l <= 9; l += 1) {
//         for (let m = l; m <= 9; m += 1) {
//           for (let n = m; n <= 9; n += 1) {
//             if ((i === j) || (j === k) || (k === l) || (l === m) || (m === n)) {
//               const num = parseInt(`${i}${j}${k}${l}${m}${n}`, 10);
//               const isValid = conditionMatch(num);
//               if (isValid === true) {
//                 console.log(num);
//                 count += 1;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// console.log(count);
let consecutivePair = {};
const checkConsequetive = (numberString) => {
  if (numberString.length < 2) {
    return false;
  }
  if (numberString[0] === numberString[1]) {
    if (consecutivePair[`${numberString[0]}${numberString[1]}`]) {
      consecutivePair[`${numberString[0]}${numberString[1]}`] += 1;
    } else {
      consecutivePair[`${numberString[0]}${numberString[1]}`] = 1;
    }
  }
  return checkConsequetive(numberString.substring(1));
};

const isValid = (number) => {
  if ((number < 402328) || (number > 864247)) {
    return false;
  }
  consecutivePair = {};
  checkConsequetive(number.toString());

  const values = Object.values(consecutivePair);
  if (values.includes(1)) {
    console.log('consecutivePair', consecutivePair, number.toString());
    return true;
  }
  return false;
};


let count = 0;
const generateNumber = (digit, number) => {
  if (number.toString().length === 6) {
    if (isValid(number)) {
      count += 1;
    }
    return number;
  }
  for (let i = digit; i <= 9; i += 1) {
    const newNumber = number * 10 + i;
    generateNumber(i, newNumber);
  }
};

for (let i = 4; i <= 9; i += 1) {
  generateNumber(i, i);
}
console.log(count);
