// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

let particleImages = [];

function preload(){
  particleImages = [
    loadImage("balls/1.png"),
    loadImage("balls/2.png"),
    loadImage("balls/3.png"),
    loadImage("balls/4.png"),
    loadImage("balls/5.png"),
    loadImage("balls/6.png"),
    loadImage("balls/7.png"),

  ]
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 6));
    this.acceleration = createVector(0, 0);
    this.mass = random(2, 6);
    this.r = sqrt(this.mass) * 30;
    // images!
    this.img = random(particleImages);
    this.angle = random(TWO_PI);
    this.spin = random(-0.05, 0.05);

  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Collision Detection and Resolution
  collide(other) {

    let impactVector = p5.Vector.sub(other.position, this.position);
    let d = impactVector.mag();
    if (d < this.r + other.r) {
      
      // Push the particles out so that they are not overlapping
      let overlap = d - (this.r + other.r);
      let dir = impactVector.copy();
      dir.setMag(overlap * 0.5);
      this.position.add(dir);
      other.position.sub(dir);
      
      // Correct the distance!
      d = this.r + other.r;
      impactVector.setMag(d);
      
      let mSum = this.mass + other.mass;
      let vDiff = p5.Vector.sub(other.velocity, this.velocity);
      // Particle A (this)
      let num = vDiff.dot(impactVector);
      let den = mSum * d * d;
      let deltaVA = impactVector.copy();
      deltaVA.mult(2 * other.mass * num / den);
      this.velocity.add(deltaVA);
      // Particle B (other)
      let deltaVB = impactVector.copy();
      deltaVB.mult(-2 * this.mass * num / den);
      other.velocity.add(deltaVB);
    }
  }

  // Bounce edges
  edges() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }

    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  show() {
    // imageMode(CENTER);
    // image(this.img, this.position.x, this.position.y, this.r * 2, this.r * 2);
    
    this.angle += this.spin;
    
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    imageMode(CENTER)
    image(this.img, 0, 0, this.r * 2, this.r * 2);
    pop();
    
  }
}
