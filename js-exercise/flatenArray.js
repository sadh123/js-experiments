array = [[1, 2, 3], [2, 4, 5], 6];

var result = array.reduce(function (total, amount) {
  return total.concat(amount);
}, []);
console.log(result);