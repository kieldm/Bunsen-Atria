let bkgdColor, foreColor;

let stringCount = 20;
let pointCount;
let pointSpread = 250;
let stringPoints = [];

var canvasIdName = 'canvas-container';
var canvasDiv = document.getElementById(canvasIdName);
var cWidth = canvasDiv.offsetWidth;
var cHeight = canvasDiv.offsetHeight;

function setup() {
  var heroCanvas = createCanvas(cWidth, cHeight);        ////////////// Created canvas and size
  heroCanvas.parent(canvasIdName);

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

      // DEBUG VIEW POINTS
      // ellipse(stringPoints[p][m].ellipseX, stringPoints[p][m].ellipseY, 5, 5);

      curveVertex(stringPoints[p][m].ellipseX, stringPoints[p][m].ellipseY);
    }
    endShape();
  }
}

////////////////////////////////////// ANIMATORS - QUAD
function easeInQuad(x) {
  return x * x;
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function easeInOutQuad(x) {
  return x < 0.5
    ? 2 * x * x
    : 1 - Math.pow(-2 * x + 2, 2) / 2;
}


function mouseMoved(){
  for(var p = 0; p < stringCount; p++){
    for(var m = 0; m < pointCount; m++){
      stringPoints[p][m].mouseUpdate();
    }
  }
}

function windowResized(){
  cWidth = canvasDiv.offsetWidth;
  cHeight = canvasDiv.offsetHeight;

  heroCanvas = createCanvas(cWidth, cHeight);        ////////////// Created canvas and size
  heroCanvas.parent(canvasIdName);

  createStringPoints();
}

function createStringPoints(){
  pointCount = floor(height/pointSpread) + 4;

  stringPoints = [];
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