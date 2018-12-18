function Line(canvas, ctx) {
  var HEIGHT = canvas.height;
  var LINE_WIDTH = 4;


  var that = this;
  this.lines = [];
  var speed = 1;

  this.pointsarray = [];

  function linepoints(x, y) {
    this.x = x;
    this.y = y;
  }

  canvas.addEventListener('mousedown', function (e) {
    if (e.clientY <= 350) {
      this.down = true;
      this.X = e.clientX;
      this.Y = e.clientY;
      that.pointsarray = [];
    }
  });
  canvas.addEventListener('mouseup', function () {

    this.down = false;
    that.lines.push(that.pointsarray);



    that.maxY = getMaxY(that.pointsarray);

    moveLine(that.pointsarray, that.maxY);

  });

  canvas.addEventListener('mousemove', function (e) {

    this.style.cursor = 'pointer';
    if (e.clientY <= 350) {
      if (this.down) {

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

  function moveLine(lines, maxY) {


    interval = setInterval(() => {
      var lastX = lines[0].x,
        lastY = lines[0].y;

      if (lines[maxY.i].y <= 350 - LINE_WIDTH + 1) {

        ctx.clearRect(0, 0, 1000, 350);
        lines[0].y += speed;

        for (let i = 1; i < lines.length; i++) {
          lines[i].y += speed;
          drawline(lines[i].x, lines[i].y, lastX, lastY);
          lastX = lines[i].x, lastY = lines[i].y;

        }
      }
    }, 10);


  }

  function drawline(x, y, lastX, lastY) {

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineCap = 'round';
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "black";
    ctx.stroke();

  }


  function getMaxY(line) {

    var max = line.reduce(function (acc, curr, i, line) {

      if (acc.y < curr.y) {
        return {
          x: curr.x,
          y: curr.y,
          i: i
        }
      } else return acc;

    }, {
      x: line[0].x,
      y: line[0].y,
      i: 0
    })


    return max;
  }
}