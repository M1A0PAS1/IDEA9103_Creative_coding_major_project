//We need a variable to hold our image
let img;
let container;
let imageSaved = false;

//Let's make an object to hold the draw properties of the image
let imgDrwPrps = { aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0 };

//A variable for the canvas aspect ratio
let canvasAspectRatio = 0;

//let's load the image from disk
function preload() {
  img = loadImage('/assets/Claude_Monet,_Saint-Georges_majeur_au_crépuscule.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  calculateImageDrawProps();
  container = createGraphics(img.width, img.height);
}

function draw() {
  background(220);
  if (!imageSaved) {
    pointImg(container);
    saveHiddenCanvasAsImage(container);
    imageSaved = true;
  }

  //image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);

}

function saveHiddenCanvasAsImage(canvas) {
  canvas.save('myImg.jpg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
}

function calculateImageDrawProps() {
  //Calculate the aspect ratio of the canvas
  canvasAspectRatio = width / height;
  //if the image is wider than the canvas
  if (imgDrwPrps.aspect > canvasAspectRatio) {
    //then we will draw the image to the width of the canvas
    imgDrwPrps.width = width;
    //and calculate the height based on the aspect ratio
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio) {
    //otherwise we will draw the image to the height of the canvas
    imgDrwPrps.height = height;
    //and calculate the width based on the aspect ratio
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  }
  else if (imgDrwPrps.aspect == canvasAspectRatio) {
    //if the aspect ratios are the same then we can draw the image to the canvas size
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

function pointImg(canvas) {
  for (let col = 0; col <= img.width; col += 2) {
    for (let row = 0; row <= img.height; row += 2) {
      let xPos = map(col, 0, img.width, 0, width);
      let yPos = map(row, 0, img.height, 0, height);
      let c = img.get(xPos, yPos);
      canvas.push();
      canvas.translate(xPos, yPos);
      canvas.rotate(radians(random(360)));
      canvas.noFill();
      canvas.stroke(color(c));
      canvas.strokeWeight(random(5));
      canvas.point(xPos, yPos);
      canvas.strokeWeight(random(3));
      canvas.curve(xPos, yPos, sin(xPos) * random(60), cos(xPos) * sin(xPos) * random(90), random(10), random(80), cos(yPos) * sin(yPos) * random(140), cos(xPos) * sin(xPos) * 50);
      canvas.pop();
    }
  }
}