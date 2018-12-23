function Line(obstacleHeight) {
  var HEIGHT = canvas.height;
  this.LINE_WIDTH = 4;
  var workingHeight = HEIGHT - obstacleHeight;

  this.mouseMove = false;

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
      ctx.beginPath();
      ctx.arc(this.X, this.Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
      that.pointsarray.push(new linepoints(this.X, this.Y));
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
    // console.log(that.getcentroid(that.pointsarray));
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
    lastX = lines[0].x;
    lastY = lines[0].y + speed;
    if (lines[maxY.i].y >= HEIGHT - obstacleHeight) {

      speed = 0;
    }

    lines[0].y += speed;

    for (let i = 1; i < lines.length; i++) {

      lines[i].y += speed;
      if (lines[maxY.i].y >= HEIGHT - obstacleHeight) {
        speed = 0;

        // lines[i].y=lines[i].y;
      }
      that.drawline(lines[i].x, lines[i].y, lastX, lastY);
      lastX = lines[i].x, lastY = lines[i].y;

    }
    // for (let j = 0; j < that.lines.length; j++) {
    //   for (let k = 0; k < that.lines[j].length; k++) {
    //     console.log(that.lines[j][k].x, that.lines[j][k].y)
    //   }
    // }

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

  this.getcentroid = function (points) {
    var centroid = {
      x: 0,
      y: 0
    };
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      centroid.x += point.x;
      centroid.y += point.y;
    }
    centroid.x /= points.length;
    centroid.y /= points.length;
    centroid.x = Math.round(centroid.x)
    centroid.y = Math.round(centroid.y)
    return centroid;
  }


  this.lineCollision = function (lines) {
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        // console.log(lines[i][j].x);

      }
    }

  }



}
