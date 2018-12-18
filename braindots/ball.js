function Ball(canvas, ctx, x1, y1, color) {
  this.x = x1;
  this.y =y1;
  this.color=color;
  this.collision=false;

  this.drawOneBall =function() {
    ctx.beginPath();
    ctx.arc( this.x ,  this.y , BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }


  // this.drawOneBall(this.x, this.y, 20, color);


  this.moveBallY =function(){
    this.y ++;
 
 
  }
}