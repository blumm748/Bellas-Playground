// Shoutout to the legend Daniel Shiffman from The Nature of Code http://natureofcode.com

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 40; i++){
    let x = random(width);
    let y = random(height);
    particles.push(new Particle(x,y));
  }
}

function draw() {
  clear();

  // particleA.collide(particleB);
  
  for (let i = 0; i < particles.length; i++){
    let particleA = particles[i];
    for (let j = i +1; j <particles.length; j++){
      particleB = particles[j];
      particleA.collide(particleB);
    }
  }

  for (let particle of particles){
  particle.update();
  particle.edges();
  particle.show();

  }

}
