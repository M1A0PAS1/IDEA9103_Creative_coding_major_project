let color1, color2, color3;
let time = 0; //Use to track the diff time of the day
let canvaColor;
let waterRipples = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  color1 = color(32, 55, 69);
  color2 = color(102, 43, 59);
  color3 = color(50, 30, 40);
  canvaColor = color(0, 0, 0);

  for (let i = 0; i < 20; i++) {
    waterRipples.push(new waterRipple(random(0, width * 0.8), random(height * 0.6, height * 0.9), random(20, 70)));
  }
}

function draw() {
  background(canvaColor);
  time += 1;
  updateCanvaColor();
  drawSky();
  drawWaterReflct();
  drawWaterRipple()
  drawTower();
}

function drawSky() {
  push();
  rotateX(85);
  translate(0, 0, -40);

  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 200) {
        interpColor = lerpColor(color(196, 99, 85), color(189, 120, 51), map(d, 0, 200, 0, 1));
      } else {
        interpColor = lerpColor(color(209, 134, 61), color(88, 142, 189), map(d, 200.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }
  pop();
}

function drawWaterReflct() {
  push();
  rotateX(92);
  translate(0, 0, 100);

  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 200) {
        interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, 200, 0, 1));
      } else {
        interpColor = lerpColor(color(220, 147, 47), color(69, 106, 162), map(d, 200.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }
  pop();
}

function drawTower() {
  fill(120, 75, 50);
  push();
  rotateX(92);
  translate(0, 200, 50);
  scale(0.5);
  beginShape();
  for (let y = -130; y <= 75; y += 10) {
    let lerpedColor;
    if (y < -30) {
      lerpedColor = lerpColor(color1, color2, map(y, -130, -30, 0, 1));
    } else {
      lerpedColor = lerpColor(color2, color3, map(y, -30, 75, 0, 1));
    }
    fill(lerpedColor);
    vertex(-260, 75, -130);
    vertex(-10, 75, -130);
    vertex(-15, 75, -100);
    vertex(-30, 75, -80);
    vertex(-60, 75, -80);
    vertex(-70, 75, -65);
    vertex(-85, 75, -50);
    vertex(-100, 75, -50);
    vertex(-105, 75, -10);
    vertex(-130, 75, 0);
    vertex(-140, 75, -10);
    vertex(-140, 75, 50);
    vertex(-150, 75, 70);
    vertex(-165, 75, 50);
    vertex(-170, 75, -10);
    vertex(-200, 75, -50);
    vertex(-250, 75, -80);
    noStroke();
  }
  endShape(CLOSE);
  pop();

}

function drawWaterRipple() {
  push();
  translate(-400, 0, 0);
  for (let ripple of waterRipples) {
    ripple.update();
    ripple.display();
  }
  pop();
}

function updateCanvaColor() {
  let myColor = map(sin(time), -1, 1, 0, 255);
  canvaColor = color(myColor, myColor, myColor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class waterRipple {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = 255;
  }

  update() {
    this.radius += 1;
    this.alpha -= 2;
    if (this.alpha <= 0) {
      this.radius = 0;
      this.alpha = 255;
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    noFill();
    stroke(0, 150, 255, this.alpha);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}