function Obstacle(canvas,ctx,height){
  
this.height=height;
this.drawObstacle= function(){
  ctx.beginPath();
  ctx.lineWidth = "6";
  ctx.fillStyle = "grey";
  ctx.fillRect(0,350, 1000, this.height); 
}
}