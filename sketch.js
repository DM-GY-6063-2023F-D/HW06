let CIRCLE = "circle";
let POINT = "point";
let LINE = "line";

function drawCircle() {
  fill(255);
  stroke(0);
  textSize(1.8 * height);
  textAlign(LEFT, BASELINE);

  for (let c = CIRCLE.length - 1; c >= 0; c--) {
    let x = map(c, 0, CIRCLE.length + 1, 0, width);
    text(CIRCLE[c], x - 20, height);
  }
}

function drawPoint(p, a) {
  fill(0);
  noStroke();
  textSize(height / 50);
  textAlign(CENTER, CENTER);

  push();
  translate(p.x, p.y);
  rotate(a);
  text(POINT, 0, 0);
  pop();
}

function drawLine(p, lineTxt, lineAngle) {
  fill(0);
  noStroke();
  textSize(height / 55);
  textAlign(LEFT, CENTER);

  let elapsedTime = millis() - p.t;
  let drawTextLength = min(elapsedTime / p.d, lineTxt.length);
  let drawText = lineTxt.slice(0, drawTextLength);

  push();
  translate(p.x, p.y);
  rotate(lineAngle);
  text(drawText, -textSize(), 0);
  pop();
}

function drawLineAndPoints(p0, p1) {
  let lineAngle = atan2(p1.y - p0.y, p1.x - p0.x);
  let lineLength = dist(p0.x, p0.y, p1.x, p1.y);
  let lineTxt = LINE;

  for (let i = 0; i < lineLength / 3; i++) {
    lineTxt = lineTxt.replace("li", "lii");
  }

  drawLine(p0, lineTxt, lineAngle);
  drawPoint(p0, lineAngle - HALF_PI);
  drawPoint(p1, lineAngle + HALF_PI);
}

function createPoint() {
  return {
    x: random(width),
    y: random(height),
    t: millis(),
    d: random(10, 20),
  };
}

let points;

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = [];
  mouseClicked();
}

function draw() {
  background(255);
  drawCircle();

  for (let i = 0; i < points.length; i += 2) {
    drawLineAndPoints(points[i], points[i + 1]);
  }
}

function mouseClicked() {
  for (let c = 0; c < 10; c++) {
    points.push(createPoint());
  }
}
