function Obstacle(canvas, ctx, height) {

  this.height = height;
  this.drawObstacle = function () {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.fillStyle = "#909090";
    ctx.fillRect(0, 350, WIDTH, this.height);
  }
}