let player;
let birds = [];
let trees = [];
let door;

function setup() {
  createCanvas(800, 600);

  player = {
    x: 50,
    y: height - 50,
    size: 40
  };

  //birds
  for (let i = 0; i < 5; i++) {
    birds.push(new Bird(random(width), random(height)));
  }

  //trees
  for (let i = 0; i < 20; i++) {
    trees.push(new Tree(random(width), random(height)));
  }

  //exit
  door = {
    x: width - 60,
    y: 20,
    w: 40,
    h: 60
  };
}

function draw() {
  background(180, 220, 255); // light sky blue

  
  for (let tree of trees) {
    tree.display();
  }

  
  for (let bird of birds) {
    bird.move();
    bird.display();
  }

  //human
  drawFace(player.x, player.y, player.size);

  
  movePlayer();

  
  drawDoor(door.x, door.y, door.w, door.h);

  
  if (player.x > door.x && player.x < door.x + door.w && 
      player.y > door.y && player.y < door.y + door.h) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("You Win!", width/2, height/2);
    noLoop(); 
  }
}

function mousePressed() {
  
  birds.push(new Bird(mouseX, mouseY));
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 3;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += 3;
  }
}

function drawFace(x, y, size) {
  fill(255, 224, 189); 
  ellipse(x, y, size);

  fill(0); 
  ellipse(x - size/6, y - size/8, size/10);
  ellipse(x + size/6, y - size/8, size/10);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(x, y + size/10, size/4, size/6, 0, PI); // smile
  noStroke();
}

function drawDoor(x, y, w, h) {
  fill(139, 69, 19); 
  rect(x, y, w, h);
  fill(255); 
  ellipse(x + w - 10, y + h/2, 5);
}

//birds wings
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 50);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = color(random(255), random(255), random(255));
    this.wingAngle = random(TWO_PI);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    
    this.wingAngle += 0.2;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    ellipse(0, 0, this.size); 

    
    let wingOffset = sin(this.wingAngle) * 10;

    fill(this.color);
    ellipse(-this.size/2, -10 + wingOffset, this.size/2, this.size/3);
    ellipse(this.size/2, -10 - wingOffset, this.size/2, this.size/3);

    fill(0); 
    ellipse(-this.size/6, -this.size/8, this.size/10);
    ellipse(this.size/6, -this.size/8, this.size/10);

    fill(255, 100, 0); // beak
    triangle(0, this.size/8, -this.size/10, this.size/4, this.size/10, this.size/4);
    pop();
  }
}


class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 60);
  }

  display() {
    fill(34, 139, 34);
    triangle(this.x, this.y - this.size, this.x - this.size/2, this.y, this.x + this.size/2, this.y);
    fill(139, 69, 19);
    rect(this.x - this.size/10, this.y, this.size/5, this.size/2);
  }
}