var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var BALL_RADIUS = 20;
var circle1X = 400;
var circle1Y = 100;
var circle2X = 800;
var circle2Y = 100;
var background = new Image();
background.src = "./br-bck.png";


function Game() {
  var ball = [];
  var line1;
  var obstacle1;
  // var collision = false;
  var obstacleHeight = 50;
  Data.setData(false);
  var collBetnBalls = false;
  var slopeLeftVal;
  var slopeRightVAl;

  this.init = function () {
    line1 = new Line(obstacleHeight);
    obstacle1 = new Obstacle(obstacleHeight);
    ball1 = new Ball(circle1X, circle1Y, "#5dc7f1");
    ball2 = new Ball(circle2X, circle2Y, "#ec96bd");
    ball1.drawOneBall();
    ball2.drawOneBall();
    ball.push(ball1);
    ball.push(ball2);
    obstacle1.drawObstacle();
    this.drawGame();
  };

  this.drawGame = function () {
    if (Data.getData()) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      obstacle1.drawObstacle();
      for (let i = 0; i < line1.lines.length; i++) {
        line1.moveLine(line1.lines[i], line1.getMaxY(line1.lines[i]));
      }

      for (let i = 0; i <= 1; i++) {
        if (ball[i].y < 330) {
          for (let j = 0; j < line1.lines.length; j++) {
            for (let k = 0; k < line1.lines[j].length; k++) {
              var dist = this.distance(
                ball[i].x,
                ball[i].y,
                line1.lines[j][k].x,
                line1.lines[j][k].y,
              );

              if (parseInt(dist) == BALL_RADIUS + 2) {
                ball[i].collision = true;

                if (line1.lines[j][k - 1].y < line1.lines[j][k + 1].y) {

                  ball[i].slopeLeft = true;
                } else {

                  ball[i].slopeRight = true;
                }
              }
              if (!collBetnBalls) {
                // ball[i].ballY(line1.lines[j][k].y);

                if (ball[i].slopeLeft) {
                  ball[i].moveBallX(0.009);
                  // ball[i].ballY(line1.lines[j][k].y - BALL_RADIUS);
                  // k--;
                }
                if (ball[i].slopeRight) {
                  ball[i].moveBallX(-0.009);
                  // ball[i].ballY(line1.lines[j][k].y - BALL_RADIUS);
                  // k++;
                }
              }
              // console.log(k);

              // slopeLeftVal = this.slope(line1.lines[j][k - 1].x, line1.lines[j][k - 1].y, line1.lines[j][k].x, line1.lines[j][k].y);
              // slopeRightVal = this.slope(line1.lines[j][k].x, line1.lines[j][k].y, line1.lines[j][k + 1].x, line1.lines[j][k + 1].y);
            }
          }

          if (parseInt(this.distance(ball[0].x, ball[0].y, ball[1].x, ball[1].y)) === BALL_RADIUS + BALL_RADIUS - 2) {
            console.log('next level');
            collBetnBalls = true;
          }
          if (!ball[i].collision) {
            ball[i].moveBallY(1.5);
          }

        }
        ball[i].drawOneBall();
      }
    } else {
      Data.setData(false);
    }

    requestAnimationFrame(this.drawGame.bind(this));
  };

  this.distance = function (x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  };


  this.slope = function (x1, y1, x2, y2) {
    var slope = (y2 - y1) / (x2 - x1);
    return slope;
  }
}

window.addEventListener("load", function () {
  ctx.drawImage(background, 10, 10);
  var game1 = new Game();
  game1.init();
});
