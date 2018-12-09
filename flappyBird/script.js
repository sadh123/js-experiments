var pipearray = [];
var iskeypressed = false;
var isgameover =false;
var container = document.getElementById('container');

function Game() {
  this.container = document.getElementById('container');
  this.container.style.backgroundImage = "url('./images/foreground.png')";
  this.container.style.width = "700px";
  this.container.style.height = "500px";
  this.container.style.position = "relative";
  this.container.style.zIndex = "0";
  this.gap = 100;
  this.container.style.borderBottom = "10px solid green"
  this.scoreValue = 0;


  this.gameover = document.createElement('div');
  this.gameover.style.backgroundImage = "url('./images/gameover.png') ";
  this.gameover.style.backgroundSize = "contain";
  this.gameover.style.position = "absolute";
  this.gameover.style.top = "100px";
  this.gameover.style.left = "200px"
  this.gameover.style.width = "300px";
  this.gameover.style.height = "70px";
  this.gameover.style.zIndex = "20";



  this.score = document.createElement('div');
  this.score.style.position = "absolute";
  this.score.style.top = "20px";
  this.score.style.left = "535px"
  this.score.style.height = "70px";
  this.score.style.zIndex = "50";
  this.score.style.fontSize = "50px";
  this.score.style.fontWeight = "700";
  this.score.style.color = "white";
  this.score.innerHTML = "Score ";
  this.container.appendChild(this.score);

  this.scorevalue = document.createElement('div');
  this.scorevalue.style.position = "absolute";
  this.scorevalue.style.top = "20px";
  this.scorevalue.style.left = "660px";
  this.scorevalue.style.height = "70px";
  this.scorevalue.style.zIndex = "60";
  this.scorevalue.style.fontSize = "50px";
  this.scorevalue.style.fontWeight = "700";
  this.scorevalue.style.color = "white";
  this.scorevalue.innerHTML = 0;
  this.container.appendChild(this.scorevalue);


  var that = this;

  var counter = 0;
  var bird = new Bird();
  bird.createbird(this.container);

  document.addEventListener('keydown', function () {
    // console.log('down');
    iskeypressed = true;
  });

  var interval = setInterval(function () {

    counter++;
    bird.movebird();
    if (counter % 180 == 0) {
      var pipe = new Pipe();
      pipe.createpipe(this.container);
      pipearray.push(pipe);


    }
    that.bordercollision();
    for (let i = 0; i < pipearray.length; i++) {
      pipearray[i].movepipe();
      that.checkcollision(pipearray[i]);
      if (parseInt(pipearray[i].pipeup.style.left) == -80) {
        pipearray[i].pipeup.remove();
        pipearray[i].pipedown.remove();
        pipearray.shift(pipearray[i]);
      }

      if (-20 == parseInt(pipearray[i].pipeup.style.left)) {
        that.scoreValue++;

      }
      that.scorevalue.innerHTML = that.scoreValue;

    }

    if (iskeypressed) {
      iskeypressed = false;
      bird.flyBird();
    }

  }, 15);
  this.bordercollision = function () {
    if ((parseInt(bird.bird.style.top) >= 475) || (parseInt(bird.bird.style.top) <= 0)) {
      clearInterval(interval);
      this.isgameover=true;
      this.container.appendChild(this.gameover);
    }
  }
  this.checkcollision = function (i) {
    bx = parseInt(bird.bird.style.left);
    bw = parseInt(bird.bird.style.width);
    by = parseInt(bird.bird.style.top);

    if ((bx + bw >= parseInt(i.pipeup.style.left) && bx + bw <= (parseInt(i.pipeTopDown.style.left) + parseInt(i.pipeTopDown.style.width) + 5))) {
      if ((parseInt(i.pipeTopUp.style.top)) + 30 >= by || parseInt(i.pipeTopDown.style.top) + 10 <= by + bw)

      {
        console.log("collision")
        clearInterval(interval);
        this.isgameover=true;
        this.container.appendChild(this.gameover);
      }

    } else {

    }


  }


}




function Pipe(container) {
  this.generateRandomNumber = function (min, max) {

    return Math.random() * (max - min) + min;
  }

  this.createpipe = function (container) {
    this.gap = 100;
    this.width = 52;
    this.container = container;
    this.height = this.generateRandomNumber(0, 250);
    this.pipeTopUp = document.createElement('div');
    this.pipeTopUp.style.backgroundImage = "url('./images/pipe-top.png')"
    this.pipeTopUp.style.width = "52px";
    this.pipeTopUp.style.height = "24px";
    this.pipeTopUp.style.position = "absolute";
    this.pipeTopUp.style.top = this.height - 24 + "px";
    this.pipeTopUp.style.zIndex = "15";
    this.pipeTopUp.style.left = "700px";



    this.pipeup = document.createElement('div')
    this.pipeup.style.width = this.width + 'px';
    this.pipeup.style.height = this.height - 24 + 'px';
    this.pipeup.style.position = "absolute";
    this.pipeup.style.top = '0px';
    this.pipeup.style.left = '700px';
    this.pipeup.style.backgroundImage = "url('./images/pipe-cut.png')"
    this.pipeup.style.zIndex = "10";

    container.appendChild(this.pipeup);
    container.appendChild(this.pipeTopUp);

    this.pipeTopDown = document.createElement('div');
    this.pipeTopDown.style.backgroundImage = "url('./images/pipe-top.png')"
    this.pipeTopDown.style.width = "52px";
    this.pipeTopDown.style.height = "24px";
    this.pipeTopDown.style.position = "absolute";
    this.pipeTopDown.style.top = this.height + 24 + this.gap + "px";
    this.pipeTopDown.style.zIndex = "15";
    this.pipeTopDown.style.left = "700px";


    this.pipedown = document.createElement('div')
    this.pipedown.style.width = this.width + 'px';
    this.pipedown.style.height = (500 - this.gap - 24 - this.height) + 'px';
    this.pipedown.style.position = "absolute";
    this.pipedown.style.bottom = '0px';
    this.pipedown.style.left = "700px";
    this.pipedown.style.backgroundImage = "url('./images/pipe-cut.png')"
    this.pipedown.style.zIndex = "10"
    container.appendChild(this.pipedown);
    container.appendChild(this.pipeTopDown);

  }
  var x = 0;
  this.movepipe = function () {
    this.pipeup.style.left = parseInt(this.pipeup.style.left) - 1.5 + 'px';
    this.pipedown.style.left = parseInt(this.pipedown.style.left) - 1.5 + 'px';
    this.pipeTopUp.style.left = parseInt(this.pipeup.style.left) - 1.5 + 'px';
    this.pipeTopDown.style.left = parseInt(this.pipedown.style.left) - 1.5 + 'px';
  }
}


function Bird() {
  this.gravity = 0;
  this.bird = document.createElement('div');

  this.createbird = function (container) {
    container.appendChild(this.bird);
    this.bird.style.width = "34px";
    this.bird.style.height = "24px";
    this.bird.style.position = "absolute";
    this.bird.style.top = "100px";
    this.bird.style.left = "50px";
    this.bird.style.backgroundImage = "url('./images/bird.png')";
  }

  // console.log(this.bird);

  this.flyBird = function () {
    this.bird.style.top = +parseInt(this.bird.style.top) +this.gravity+ 'px';
    this.gravity -= 1.3;
  }


  this.movebird = function () {
    this.gravity += 0.07;
    this.bird.style.top = this.gravity + parseInt(this.bird.style.top) + 'px';

  }
}

function init() {
  this.gamestart = document.createElement('div');
  this.gamestart.style.backgroundImage = "url('./images/message.png') ";
  this.gamestart.style.backgroundSize = "100% 100%";


  this.gamestart.style.position = "absolute";
  this.gamestart.style.top = "0px";
  this.gamestart.style.left = "0px"
  this.gamestart.style.width = "600px";
  this.gamestart.style.height = "500px";
  this.gamestart.style.marginLeft = "500px";
  this.gamestart.style.marginTop = "100px";
  this.gamestart.style.zIndex = "500";
  this.gamestart.backgroundColor = "red";
  this.isgamestarted = false;
  this.isgameover =false;
  this.showWaitingPage = function () {

    console.log(this.gamestart);
    container.appendChild(this.gamestart);
  }




  this.startGame = function () {
    container.removeChild(this.gamestart);
    let game1 = new Game();

  }

}

var init = new init();
init.showWaitingPage();
document.addEventListener('keydown', function () {
  if (!init.isgamestarted) {
    init.isgamestarted = true;
    init.startGame();
  }
});
