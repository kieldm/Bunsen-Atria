class StringPoint {
  constructor(m, x, y, mag){
    this.index = m;

    this.originX = x;
    this.originY = y;
    this.ellipseX = this.originX;
    this.ellipseY = this.originY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.damping = 0.95; //0.95;
    this.maxSpeed = 1; //5;
    // this.maxDistance = 150;  // Maximum distance from the origin
    // this.returnForce = 0.02; //0.02;  // Force that pulls the ellipse back to the origin
    this.returnForce = mag;
    this.pushMagnitude = 2.0; //0.75;  // Increase for more force

    this.mouseInfluRad = 450;

    this.build();
  }

  build(){
   
  }

  run(){
    this.update();
    // this.display();
  }

  update(){
    // Apply a force that gradually pulls the ellipse back to the origin
    let returnX = this.originX - this.ellipseX;
    let returnY = this.originY - this.ellipseY;
    this.velocityX += returnX * this.returnForce;
    this.velocityY += returnY * this.returnForce;

    // Apply velocity to the ellipse's position
    this.ellipseX += this.velocityX;
    this.ellipseY += this.velocityY;

    // Apply some damping to slow the ellipse down over time
    this.velocityX *= this.damping;
    this.velocityY *= this.damping;

    // Limit the ellipse's speed to a maximum value
    this.velocityX = constrain(this.velocityX, -this.maxSpeed, this.maxSpeed);
    this.velocityY = constrain(this.velocityY, -this.maxSpeed, this.maxSpeed);
  }

  mouseUpdate(){
    // Check if the mouse is close to the ellipse
    let distanceToMouse = dist(mouseX, mouseY, this.ellipseX, this.ellipseY);
    if (distanceToMouse < this.mouseInfluRad) {
      // Calculate the direction to push the ellipse away from the mouse
      let pushX = this.ellipseX - mouseX;
      let pushY = this.ellipseY - mouseY;

      let magTaper0 = map(distanceToMouse, 0, this.mouseInfluRad, 0, 1);
      let magTaper1 = map(easeOutQuad(magTaper0), 0, 1, this.pushMagnitude, 0);

      // Normalize the push direction and add a small force
      let pushForceX = (pushX / distanceToMouse) * magTaper1;
      let pushForceY = (pushY / distanceToMouse) * magTaper1;

      // Update the ellipse's velocity based on the push force
      this.velocityX += pushForceX;
      this.velocityY += pushForceY;
    }
  }

  display(){
    // Draw the tether (line) from the origin to the ellipse
    // stroke(0);
    // line(this.originX, this.originY, this.ellipseX, this.ellipseY);

    // Draw the ellipse
    fill(127);
    // ellipse(this.ellipseX, this.ellipseY, 50, 50);
    rect(this.ellipseX, this.ellipseY, 4, 4);

    // Draw the origin point
    // fill(0);
    // ellipse(this.originX, this.originY, 10, 10);
  }

  stringSegment(){
    noFill();
    stroke(foreColor);

    line(this.ellipseX, this.ellipseY, stringPoints[this.index - 1].ellipseX, stringPoints[this.index - 1].ellipseY);
  }
}