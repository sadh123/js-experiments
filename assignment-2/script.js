var ballsarray = [];

function game() {
  var container = document.getElementById('container');
  var boundary = {
    width: 1000,
    height: 500
  };

  container.style.width = boundary.width + 'px';
  container.style.height = boundary.height + 'px';
  container.style.border = '1px solid black';
  container.style.position = 'relative';
  // container.style.margin = "2%";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i <5; i++) {
  character = {
    x: getRandomInt(0, boundary.width - 100),
    y: getRandomInt(0, boundary.height - 100),
    radius: getRandomInt(20, 35),
    color: "rgb(" + Math.random() * 256 + "," + Math.random() * 256 + "," + Math.random() * 256 + ")"
  };
  var Box = new box(character, container, boundary);
  
    Box.createBox();
    ballsarray.push(Box);
  };
  var interval = setInterval(function () {
    for (var i = 0; i <= ballsarray.length; i++) {
      ballsarray[i].moveBall();
      ballsarray[i].collision(ballsarray);
    }
  });

}

var Game = new game();

function box(charecter, element, boundary) {
  var that = this;
  this.x = charecter.x;
  this.y = charecter.y;
  this.color = charecter.color;
  this.element = element;
  this.radius = Math.floor(charecter.radius);
  this.speed = 1;

  var dir = [-1, 1];
  this.directionx = dir[Math.floor(Math.random() * 2)];
  this.directiony = dir[Math.floor(Math.random() * 2)];

  var ball = document.createElement('div');

  this.createBox = function () {
    this.element.appendChild(ball);
    ball.style.width = this.radius * 2 + 'px';
    ball.style.height = this.radius * 2 + 'px';
    ball.style.position = 'absolute';
    ball.style.backgroundColor = this.color;
    ball.style.top = this.x + 'px';
    ball.style.left = this.y + 'px';
    ball.style.borderRadius = "50%";
  };

  this.moveBall = function () {

    ball.style.left = this.x + 'px';
    ball.style.top = this.y + 'px';
    console.log('move');

    this.x += this.directionx;
    this.y += this.speed * this.directiony;
    if (this.x <= 0 || this.x >= boundary.width - this.radius * 2) {
      this.directionx = -this.directionx;
    } else if (this.y <=0 || this.y >= boundary.height - this.radius * 2) {
      this.directiony = -this.directiony;
    }
  };

  this.collision = function (ballsarray) {
    console.log("collide");
    for (var i = 0; i < ballsarray.length; i++) {
      if (this == ballsarray[i]) {
        continue;
      }
      var other = ballsarray[i];
      var dist = this.distance(other.x, other.y);
      if (other.radius + this.radius > dist) {
        var tempx;
        var tempy;
         tempx= other.directionx ;
       tempy=   other.directiony ;
        
        other.directionx = this.directionx;
        this.directionx = tempx;
        other.directiony = this.directiony;
        this.directiony = tempy;
      }
    }
  };

  this.distance = function (otherx, othery) {
    var dx = this.x - otherx;
    var dy = this.y - othery;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  };
}