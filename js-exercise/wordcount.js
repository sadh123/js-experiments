const namelist = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];
var result=namelist.reduce(function(count,name){
  count[name]=((count[name]||0)+1);//orred with 0 to get initial value 1 for each key'name'
  return count;
},{});
console.log(result);