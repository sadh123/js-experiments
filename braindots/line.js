function Line(obstacleHeight) {
  var HEIGHT = canvas.height;
  this.LINE_WIDTH = 4;
  var workingHeight = HEIGHT - obstacleHeight;
  var WIDTH = canvas.width;
  this.mouseMove = false;
  var circle1leftx = circle1X - BALL_RADIUS;
  var circle1lefty = circle1Y - BALL_RADIUS;
  var circle2leftx = circle2X - BALL_RADIUS;
  var circle2lefty = circle2Y - BALL_RADIUS;
  var circle1rightx = circle1X + BALL_RADIUS;
  var circle1righty = circle1Y + BALL_RADIUS;
  var circle2rightx = circle2X + BALL_RADIUS;
  var circle2righty = circle2Y + BALL_RADIUS;
  var that = this;
  this.lines = [];
  var speed = 1;

  this.pointsarray = [];

  function linepoints(x, y) {
    this.x = x;
    this.y = y;
  }

  canvas.addEventListener('mousedown', function (e) {
    this.style.cursor = 'pointer';
    this.down = true;
    this.X = e.clientX;
    this.Y = e.clientY;
    that.pointsarray = [];

  });
  canvas.addEventListener('mouseup', function () {

    if (this.down && !that.mouseMove) {
      that.pointsarray.push(new linepoints(this.X, this.Y));
      ctx.beginPath();
      ctx.arc(this.X, this.Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();

    }
    that.mouseMove = false;
    this.down = false;
    Data.setData(true);

    if (that.pointsarray.length > 1) {
      if ((that.pointsarray[0].x > that.pointsarray[1].x) || (that.pointsarray[1].x > that.pointsarray[2].x) || (that.pointsarray[2].x > that.pointsarray[3].x)) {
        that.pointsarray = that.pointsarray.reverse();
      }
    }
    that.lines.push(that.pointsarray);
  });

  canvas.addEventListener('mousemove', function (e) {

    this.style.cursor = 'pointer';
    if (this.Y <= workingHeight - that.LINE_WIDTH) {
      if (this.down) {
        that.mouseMove = true;
        ctx.beginPath();
        ctx.moveTo(this.X, this.Y);
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;

        ctx.lineTo(e.clientX, e.clientY);

        that.pointsarray.push(new linepoints(e.clientX, e.clientY));

        ctx.strokeStyle = "black";
        ctx.stroke();
        this.X = e.clientX;
        this.Y = e.clientY;

      }
    }


  });

  this.moveLine = function (lines, maxY) {
    speed = 1;
    // if (lines[maxY.i].y <= workingHeight - LINE_WIDTH + 1) {
    lastX = lines[0].x;
    lastY = lines[0].y + speed;
    if (lines[maxY.i].y >= 350) {

      speed = 0;
    }

    lines[0].y += speed;

    for (let i = 1; i < lines.length; i++) {

      lines[i].y += speed;
      if (lines[maxY.i].y >= 350) {
        speed = 0;

        // lines[i].y=lines[i].y;
      }
      that.drawline(lines[i].x, lines[i].y, lastX, lastY);
      lastX = lines[i].x, lastY = lines[i].y;

    }
  }


  this.drawline = function (x, y, lastX, lastY, color = 'black', lineWIdth = this.LINE_WIDTH) {

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWIdth;
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.stroke();

  }


  this.getMaxY = function (points) {

    var max = points.reduce(function (acc, curr, i, line) {

      if (acc.y < curr.y) {
        return {
          x: curr.x,
          y: curr.y,
          i: i
        }
      } else return acc;

    }, {
      x: points[0].x,
      y: points[0].y,
      i: 0
    })


    return max;
  }
  this.lineCollision = function (lines) {
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        // console.log(lines[i][j].x);

      }
    }



  }



}
