function Game() {
  var ball = [];
  var line1;
  var obstacle1;
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var obstacleHeight = 50;
  Data.setData(false);



  this.init = function () {

    line1 = new Line(canvas, ctx, obstacleHeight);
    obstacle1 = new Obstacle(canvas, ctx, obstacleHeight);
    ball1 = new Ball(canvas, ctx, 400, 100, "red");
    ball2 = new Ball(canvas, ctx, 600, 100, "blue");
    ball1.drawOneBall();
    ball2.drawOneBall();;
    ball.push(ball1);
    ball.push(ball2);
    obstacle1.drawObstacle();
    this.drawGame();
  }

  this.drawGame = function () {


    if (Data.getData()) {
      ctx.clearRect(0, 0, 1000, 400);
      obstacle1.drawObstacle();

      for (let i = 0; i <=1; i++) {
        if (ball[i].y < 330) {
          
          ball[i].moveBallY();
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



}

window.addEventListener('load', function () {

  var game1 = new Game();
  game1.init();
});