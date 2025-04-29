let arrows = []; // moving obstacles
let hearts = []; // added stationary obstacles
let exit;
let player;
let win = false;

function setup() {
  createCanvas(800, 600);
  player = createVector(50, height / 2);

  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(30, 50);
    arrows.push(new Arrow(x, y, size, randomColor()));
  }


  exit = createVector(width - 50, height / 2);
}

function draw() {
  background(220);


  fill(100, 200, 100);
  rect(exit.x - 20, exit.y - 20, 40, 40);

 
  for (let arrow of arrows) {
    arrow.update();
    arrow.display();
  }

 
  for (let heart of hearts) {
    heart.display();
  }


  fill(0);
  ellipse(player.x, player.y, 20);

  handleMovement();


  if (dist(player.x, player.y, exit.x, exit.y) < 30) {
    win = true;
  }

  if (win) {
    textSize(32);
    fill(0, 150, 0);
    textAlign(CENTER, CENTER);
    text("YOU WIN!!!!!!", width / 2, height / 2);
  }
}

function mousePressed() {

  hearts.push(new Heart(mouseX, mouseY, random(30, 50), randomColor()));
}

function handleMovement() {
  if (keyIsDown(LEFT_ARROW)) player.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) player.x += 3;
  if (keyIsDown(UP_ARROW)) player.y -= 3;
  if (keyIsDown(DOWN_ARROW)) player.y += 3;

 
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

class Arrow {
  constructor(x, y, size, col) {
    this.pos = createVector(x, y);
    this.size = size;
    this.col = col;
    this.speed = p5.Vector.random2D().mult(random(1, 3));
  }

  update() {
    this.pos.add(this.speed);


    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.speed.heading());

    fill(this.col);
    stroke(0);
    strokeWeight(1);


    beginShape();
    vertex(-this.size / 2, -this.size / 6);
    vertex(this.size / 2, 0);
    vertex(-this.size / 2, this.size / 6);
    endShape(CLOSE);
    pop();
  }
}

class Heart {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.col);
    stroke(0);
    strokeWeight(1);

    beginShape();
    vertex(0, -this.size / 2);
    bezierVertex(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
    bezierVertex(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
    endShape(CLOSE);
    pop();
  }
}

function randomColor() {
  return color(random(255), random(255), random(255));
}