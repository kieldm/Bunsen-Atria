let bkgdColor, foreColor;

let stringCount = 20;
let pointCount;
let pointSpread = 250;
let stringPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  bkgdColor = color('#29292B');
  foreColor = color(255);

  pointCount = floor(height/pointSpread) + 4;

  for(var p = 0; p < stringCount; p++){
    stringPoints[p] = [];

    var tk0 = map(p, 0, stringCount, 0, 1);
    var xSpread = map(easeInQuad(tk0), 0, 1, 0, width/2);    

    for(var m = 0; m < pointCount; m++){
      var x = width/2 + xSpread;
      var y = -pointSpread + m * pointSpread;
      stringPoints[p][m] = new StringPoint(m, x, y);
    }
  }
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

      // DEBUG VIEW POINTS
      // ellipse(stringPoints[p][m].ellipseX, stringPoints[p][m].ellipseY, 5, 5);

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

