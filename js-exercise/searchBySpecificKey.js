var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' },
]

var resultByNAme = fruits.filter(function (obj) {
  return obj.name === "Apple";
});

var resultByKey = fruits.filter(function(obj){
  return obj.id===1;
});
console.log(resultByNAme);
console.log(resultByKey);

