var container = document.getElementsByClassName('container')[0];
var scorevalue = document.getElementsByClassName("number")[0];
var wordarray = ['apple', 'ball', 'cat', 'dog'];
const starPos = 0;
const endpos = 700;
var inputlist = [];
var score=0;

var wordslist = [];

function Word() {
  container.style.position = "relative";
  that = this;

  this.word = wordarray[Math.floor(Math.random() * wordarray.length)].toLowerCase();
  this.x = Math.floor(Math.random() * (endpos - starPos) + starPos);
  this.wordcontainer = document.createElement('div');
  this.wordcontainer.style.position = "absolute";
  this.wordcontainer.style.left = this.x + "px";
  this.wordcontainer.style.border = "1px solid black";
  this.wordcontainer.style.width = "100px";
  this.wordcontainer.style.height = "25px";
  this.wordcontainer.style.top = "0px";
  this.wordcontainer.style.textAllign = "center";
  this.spanlist = [];
  this.charlist = [];


  this.draw = function () {

    for (var i = 0; i < this.word.length; i++) {
      this.spanLetter = document.createElement('span');
      this.spanLetter.style.fontSize = "24px";
      this.spanLetter.innerHTML = this.word[i];
      this.spanlist.push(this.spanLetter);
      this.charlist.push(this.word[i]);
      this.wordcontainer.appendChild(this.spanlist[i]);


    }
    container.appendChild(this.wordcontainer);
    this.wordcontainer.setAttribute("class", "words");
    this.wordcontainer.classList.add(this.charlist.join(""));

  };


  this.move = function () {
    this.wordcontainer.style.top = parseInt(this.wordcontainer.style.top) + 4 + "px";

  }

  this.updateSpan = function(len) {
    for (var i = 0; i < len; i++) {
      this.spanlist[i].style.background = i < len? "yellow " : "";
      this.spanlist[i].style.textDecoration = i < len ? "line-through" : "";
    }
  };

}

function Game() {
  var counter = 35;


  this.init = function () {
    document.addEventListener('keydown', keypress)
    var event = setInterval(this.wordgenerator, 100);
  }

  this.wordgenerator = function () {
    counter++;

    if (counter == 40) {
      var word = new Word();
      word.draw();
      wordslist.push(word);
      counter = 0;
    }

    wordslist.forEach(function (index) {
      index.move();
      if (parseInt(index.wordcontainer.style.top) == 500) {
        index.wordcontainer.remove();
        wordslist.shift(index);

      }
    });


  }


}

function keypress(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    inputlist.push(String.fromCharCode(event.keyCode).toLowerCase());
    checkletter();
  }
  if (event.keyCode == 8) {
    inputlist.pop();
    checkletter();
  }

}

function checkletter() {

  inputlength = inputlist.length;
  for (i = 0; i < wordslist.length; i++) {
  
    if(wordslist[i].charlist.slice(0,inputlength).join("")==inputlist.join("")){
  
      wordslist[i].updateSpan(inputlength);

      if(wordslist[i].charlist.length== inputlength){
        score++;
        this.inputlist=[];
        wordslist[i].wordcontainer.remove();
        wordslist.shift(wordslist[i]);
      }
    }
    scorevalue.innerHTML=score;
  }
}




function updateSpan() {
  console.log("matched");
}

var game = new Game();
game.init();