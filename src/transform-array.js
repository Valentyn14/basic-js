const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  const controlSequen = [
    "--discard-next",
    "--discard-prev",
    "--double-next",
    "--double-prev",
  ];
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  if (arr.length === 0 ||
    !controlSequen.some(item => arr.includes(item))) {
    return arr;
  }

  let res = [];  

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === controlSequen[1]) {
      res.pop();
    } else if (arr[i] === controlSequen[2]) {
      if (arr[i + 1]) {
        res.push(arr[i + 1]);
      }
    } else if (arr[i] === controlSequen[3]) {
      if (arr[i - 1] ) {
        res.push(arr[i - 1]);
      }
    } else if (arr[i] === controlSequen[0]) {
      if (arr[i + 1]) {
        i += 2;
      }
    } else {
      res.push(arr[i]);
    }
  }

  return res;
}

module.exports = {
  transform
};
