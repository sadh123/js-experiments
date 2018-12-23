var startPage = document.getElementsByClassName("startImage")[0];
var game1;
startPage.addEventListener('click', function () {
  startPage.style.display = "none";
  canvas.style.display = "block";
  gameOver.style.display = "none";

  game1 = new Game();
  game1.init();


});

gameOver.addEventListener('click', function () {
  startPage.style.display = "block";
  gameOver.style.display = "none";
  canvas.style.display = "none";
  game1 = new Game();
  game1.init();

});


// if (islevelChange) {
//   level++;
// }
nextLevel.addEventListener('click', function () {
  level++;
  startPage.style.display = "none";
  canvas.style.display = "block";
  nextLevel.style.display = "none";

  game1 = new Game();
  game1.init();


});
