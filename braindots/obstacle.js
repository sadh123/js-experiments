function Obstacle(height) {
  this.height = height;
  this.drawObstacle = function () {
    if (level == 1 || level == 2 || level == 3) {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.fillStyle = "#909090";
      ctx.fillRect(0, 550, WIDTH, this.height);
    } else if (level == 4) {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.fillStyle = "#909090";
      ctx.fillRect(0, 550, WIDTH, this.height);

    }
  }
}
