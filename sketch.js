let color1, color2, color3;
let time = 0; //Use to track the diff time of the day
let canvaColor;//Use to ctrl background color
let waterRipples = [];//Use to store ripples

function setup() {
  createCanvas(windowHeight / 455 * 828, windowHeight, WEBGL);//Apply wbgl
  //windows size 828 455
  angleMode(DEGREES);

  color1 = color(32, 55, 69);
  color2 = color(102, 43, 59);
  color3 = color(50, 30, 40);
  canvaColor = color(0, 0, 0);

  for (let i = 0; i < 20; i++) {
    waterRipples.push(new waterRipple(random(0, width * 0.8), random(height * 0.6, height * 0.9), random(windowHeight/20, windowHeight/7))); //Add randomness to ripples
  }
}

function draw() {
  background(canvaColor);
  time += 1; //Ctrl time speed
  updateCanvaColor();
  drawSky();
  drawWaterReflct();
  drawWaterRipple()
  drawTower();
}

function drawSky() {
  push();//Use push and pop to avoid affect other objects
  rotateX(85);
  translate(0, 0, -windowHeight/11.375);

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
  translate(0, 0, windowHeight/4.55);

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
  translate(0, windowHeight/2.275, windowHeight/9.1);
  scale(0.5);
  beginShape();
  for (let y = -windowHeight/3.5; y <= windowHeight/3.5; y += windowHeight/45.5) {
    let lerpedColor;
    if (y < -windowHeight/15.167) {
      lerpedColor = lerpColor(color1, color2, map(y, -windowHeight/3.5, -windowHeight/15.167, 0, 1));
    } else {
      lerpedColor = lerpColor(color2, color3, map(y, -windowHeight/15.167, windowHeight/6.067, 0, 1));
    }
    fill(lerpedColor);
    vertex(-windowHeight/1.75, windowHeight/6.067, -windowHeight/3.5);
    vertex(-windowHeight/45.5, windowHeight/6.067, -windowHeight/3.5);
    vertex(-windowHeight/30.3, windowHeight/6.067, -windowHeight/4.55);
    vertex(-windowHeight/15.167, windowHeight/6.067, -windowHeight/5.6875);
    vertex(-windowHeight/7.58, windowHeight/6.067, -windowHeight/5.6875);
    vertex(-windowHeight/6.5, windowHeight/6.067, -windowHeight/7);
    vertex(-windowHeight/5.35, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/4.55, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/4.33, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/3.5, windowHeight/6.067, 0);
    vertex(-windowHeight/3.25, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/3.25, windowHeight/6.067, windowHeight/9.1);
    vertex(-windowHeight/3.033, windowHeight/6.067, windowHeight/6.5);
    vertex(-windowHeight/2.758, windowHeight/6.067, windowHeight/9.1);
    vertex(-windowHeight/2.676, windowHeight/6.067, -windowHeight/45.5);
    vertex(-windowHeight/2.275, windowHeight/6.067, -windowHeight/9.1);
    vertex(-windowHeight/1.82, windowHeight/6.067, -windowHeight/5.6875);
    noStroke();
  }
  endShape(CLOSE);
  pop();

}

function drawWaterRipple() {
  push();
  translate(-windowHeight/1.1375, 0, 0); //Since on a 3d system, move to lhe left in x-axis to reach the real left side
  for (let ripple of waterRipples) {
    ripple.update();
    ripple.display();
  }
  pop();
}



function updateCanvaColor() {
  let whiteColor = color(255);
  let duskColor = color(255, 204, 0);
  let nightColor = color(0);

  let dawnEnd = 200; //Where day ends
  let duskStart = 600; //Where dusk start
  let morningStart = 800;
  let fullDay = 1000;

  time = time % fullDay; //To make a loop

  let currentColor;
  if (time < dawnEnd) {
    currentColor = lerpColor(whiteColor, duskColor, map(time, 0, dawnEnd, 0, 1)); //To lerp to smoothly change to dusk color
  } else if (time >= dawnEnd && time < duskStart) {
    currentColor = lerpColor(duskColor, nightColor, map(time, dawnEnd, duskStart, 0, 1));
  } else if (time >= duskStart && time < morningStart) {
    currentColor = lerpColor(nightColor, whiteColor, map(time, duskStart, morningStart, 0, 1));
  } else {
    currentColor = whiteColor;
  }
  canvaColor = currentColor; //Update canva color
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //draw();
}

class waterRipple {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = 255;
  }

  update() {
    this.radius += windowHeight/455;//Make ripples grow
    this.alpha -= 2; //Use transparency to make ripples disappear
    if (this.alpha <= 0) {//Regenarte
      this.radius = 0;
      this.alpha = 255;
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    noFill();
    stroke(0, 150, 255, this.alpha); //Blue and nofill circle
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}