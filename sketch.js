//We need a variable to hold our image
let img;

//Let's make an object to hold the draw properties of the image
let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};

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
}

function draw() {
  background(220);
  pointImg();
  //image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  
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

function pointImg() {
  for (let col= 0; col <= img.width; col++){
    for (let raw = 0; raw <= img.height; raw++){
      let c = img.get(col,raw);
      stroke(color(c));
      point(col,raw);

    }
  }
}