var canvas = document.getElementById("canvas");
var nextLevel = document.getElementsByClassName("nextLevel")[0];
var gameOver = document.getElementsByClassName("gameOver")[0];
var ctx = canvas.getContext("2d");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var BALL_RADIUS = 20;
var circle1X = 400;
var circle1Y = 150;
var circle2X = 800;
var circle2Y = 150;
var obstacleHeight = 50;
var background = new Image();
background.src = "./br-bck.png";
var isGameOver = false;
var islevelChange = false;
var level = 1;


function Game() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  var ball = [];

  var line1;
  var obstacle1;
  // var collision = false;

  Data.setData(false);
  var collBetnBalls = false;
  var slopeLeftVal;
  var slopeRightVAl;
  var velBallX = 0.03;
  isGameOver = false;
  islevelChange = false;

  this.init = function () {
    if (level === 1) {
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
    }
    if (level === 2) {
      line1 = new Line(obstacleHeight);

      obstacle1 = new Obstacle(obstacleHeight);
      ball1 = new Ball(circle1X, circle1Y, "#5dc7f1");
      ball2 = new Ball(circle2X, HEIGHT - obstacleHeight - BALL_RADIUS, "#ec96bd");
      ball1.drawOneBall();
      ball2.drawOneBall();
      ball.push(ball1);
      ball.push(ball2);
      obstacle1.drawObstacle();

      this.drawGame();
    }
    if (level === 3) {
      line1 = new Line(obstacleHeight);

      obstacle1 = new Obstacle(obstacleHeight);
      ball1 = new Ball(circle1X, HEIGHT - obstacleHeight - BALL_RADIUS, "#5dc7f1");
      ball2 = new Ball(circle2X, HEIGHT - obstacleHeight - BALL_RADIUS, "#ec96bd");
      ball1.drawOneBall();
      ball2.drawOneBall();
      ball.push(ball1);
      ball.push(ball2);
      obstacle1.drawObstacle();

      this.drawGame();
    }

  };

  this.drawGame = function () {
    // ctx.drawImage(background, 10, 10);

    if (Data.getData()) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      obstacle1.drawObstacle();
      for (let i = 0; i < line1.lines.length; i++) {

        line1.moveLine(line1.lines[i], line1.getMaxY(line1.lines[i]));

      }

      for (let i = 0; i <= 1; i++) {
        if (ball[i].y < HEIGHT - obstacleHeight - BALL_RADIUS) {
          for (let j = 0; j < line1.lines.length; j++) {
            for (let k = 0; k < line1.lines[j].length; k++) {
              var dist = this.distance(
                ball[i].x,
                ball[i].y,
                line1.lines[j][k].x,
                line1.lines[j][k].y,
              );

              if (parseInt(dist) == BALL_RADIUS + 2) {
                console.log('collision');

                ball[i].collision = true;
                ball[i].collideIndex = k;

                if (line1.lines[j][ball[i].collideIndex - 1].y <= line1.lines[j][ball[i].collideIndex + 1].y || (line1.lines[j][ball[i].collideIndex - 2].y < line1.lines[j][ball[i].collideIndex + 1].y)) {
                  ball[i].slopeLeft = true;
                  ball[i].slopeRight = false;

                } else {
                  ball[i].slopeRight = true;
                  ball[i].slopeLeft = false;

                }

              }

              if (!collBetnBalls) {
                // if (ball[i].collision) {

                // pos = this.ballLineCollision(line1.lines[j][k].y, ball[i].y);
                //   // console.log('line', line1.lines[j][k].y);
                //   // console.log('ball', ball[i].y);

                // console.log(pos);

                //   // if (Math.round(pos) > 0) {
                //   //   ball[i].moveBallY();

                //   // }
                // }
                if (ball[i].slopeLeft) {
                  ball[i].moveBallX(velBallX);
                }
                if (ball[i].slopeRight) {
                  ball[i].moveBallX(-velBallX);
                }
                // console.log(ball[i].y);
                // if (Math.floor(ball[i].y) == HEIGHT - obstacleHeight - BALL_RADIUS) {
                //   log("move ball on hit by new line");
                // }
              }
            }
          }


          if (parseInt(this.distance(ball[0].x, ball[0].y, ball[1].x, ball[1].y)) <= BALL_RADIUS + BALL_RADIUS) {
            islevelChange = "true";
            canvas.style.display = "none";
            nextLevel.style.display = "block";
            nextLevel.getElementsByClassName('text3')[0].innerHTML = level + 1;
            collBetnBalls = true;


          }

          if (ball[i].x < 0 || ball[i].x + BALL_RADIUS > WIDTH) {
            isGameOver = true;
            startPage.getElementsByClassName('text3')[0].innerHTML = level;
            collBetnBalls = true;
            canvas.style.display = "none";
            gameOver.style.display = "block";

          }
          // if (!ball[i].collision) {
          ball[i].moveBallY();
          // }

        }
        ball[i].drawOneBall();
      }
    } else {
      Data.setData(false);
    }
    if (isGameOver) {
      return;
    }
    if (islevelChange) {
      return;
    }
    requestAnimationFrame(this.drawGame.bind(this));
  };

  this.distance = function (x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  };

  this.ballLineCollision = function (lineY, ballYCor) {
    return lineY - ballYCor;


  }



  this.slope = function (x1, y1, x2, y2) {
    var slope = {
      dx: 0,
      dy: 0,
      grad: 1
    };
    dx = y2 - y1;
    dy = x2 - x1;
    grad = dy / dx;
    return slope;

  }
}
