function Obstacle(height) {
  this.height = height;
  this.drawObstacle = function () {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.fillStyle = "#909090";
    ctx.fillRect(0, 550, WIDTH, this.height);
  }
}
