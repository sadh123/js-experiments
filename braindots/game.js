var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var BALL_RADIUS = 20;

function Game() {
  var ball = [];
  var line1;
  var obstacle1;
  var canvas = document.getElementById('canvas');
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var ctx = canvas.getContext('2d');
  // var collision = false;
  var obstacleHeight = 50;
  Data.setData(false);



  this.init = function () {

    line1 = new Line(canvas, ctx, obstacleHeight);
    obstacle1 = new Obstacle(canvas, ctx, obstacleHeight);
    ball1 = new Ball(canvas, ctx, 400, 100, "red");
    ball2 = new Ball(canvas, ctx, 800, 100, "blue");
    ball1.drawOneBall();
    ball2.drawOneBall();;
    ball.push(ball1);
    ball.push(ball2);
    obstacle1.drawObstacle();
    this.drawGame();
  }

  this.drawGame = function () {


    if (Data.getData()) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      obstacle1.drawObstacle();

      for (let i = 0; i <= 1; i++) {

        if (ball[i].y < 330) {
          for (let j = 0; j < line1.lines.length; j++) {
            for (let k = 0; k < line1.lines[j].length; k++) {
              var dist = this.distCircLine(ball[i].x, ball[i].y, line1.lines[j][k].x, line1.lines[j][k].y);
              if (dist == BALL_RADIUS) {
                console.log(i,"collision");
               ball[i].collision = true;
              }
            }
          }
          if (!ball[i].collision) {
            ball[i].moveBallY();
          }

        }
        ball[i].drawOneBall();


      }

      for (let i = 0; i < line1.lines.length; i++) {

        line1.moveLine(line1.lines[i], line1.getMaxY(line1.lines[i]));


      }

    } else {
      Data.setData(false);

    }



    requestAnimationFrame(this.drawGame.bind(this));

  }


  this.distCircLine = function (x1, y1, x2, y2) {

    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }



}

window.addEventListener('load', function () {

  var game1 = new Game();
  game1.init();
});