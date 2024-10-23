let bkgdColor, foreColor;

let stringCount = 10;
let pointCount;
let pointSpread = 250;
let stringPoints = [];

let heightBuffer = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);

  bkgdColor = color('#29292B');
  foreColor = color(255);

  createStringPoints();
}

function draw() {
  background(bkgdColor);

  for(var p = 0; p < stringCount; p++){

    noFill();
    stroke(foreColor);
    strokeWeight(2);
    
    beginShape();
    for(var m = 0; m < pointCount; m++){
      stringPoints[p][m].run();

      curveVertex(stringPoints[p][m].ellipseX, stringPoints[p][m].ellipseY);
    }
    endShape();
  }
}

function mouseMoved(){
  for(var p = 0; p < stringCount; p++){
    for(var m = 0; m < pointCount; m++){
      stringPoints[p][m].mouseUpdate();
    }
  }
}

function createStringPoints(){
  pointCount = floor(height/pointSpread) + 5;

  stringPoints = [];
  
  for(var p = 0; p < stringCount; p++){
    stringPoints[p] = [];

    var tk0 = map(p, 0, stringCount, 0, 1);
    var magTaper = map((tk0), 0, 1, 0.04, 0.005);    

    for(var m = 0; m < pointCount; m++){
      var x = width/2;
      var y = -2 * pointSpread + m * pointSpread + (p%2) * pointSpread/2;

      stringPoints[p][m] = new StringPoint(m, x, y, magTaper);
    }
  }
}