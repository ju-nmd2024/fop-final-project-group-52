import Platform from "./platfrom.js";
import doodler from "./doodler.js";

let bollObj;
let gap;
let score = 0;
let platforms = [];
let state = "gameScreen";

function setup() {
  createCanvas(500, 650);

    
  bollObj = new doodler(200,600);

  let numbPlatforms = 6;
    gap = height / numbPlatforms;
    for (let i = 1; i < 6; i++) {
      platforms.push(new Platform(random(width), height - i*gap));     
    }
}

function startScreen() {
  background(0);
  fill(255);
  textSize(24);
  text("Press Enter to Start", 300, 300);
}

function gameScreen() {
  background(255);

  if (bollObj.y > 650) {
    state = "gameOver";
}
}

function gameOver() {
  background(0);
  fill(255);
  textSize(24);
  text("Game Over", 300, 300);
  text("Score: " + Math.floor(score), 300, 350);
  text("Press Enter to Restart", 300, 400);
  bollObj.y = 600;
  bollObj.velocity = 0;
  score = 0;
  platforms = [];
  let numbPlatforms = 6;
  gap = height / numbPlatforms;
  for (let i = 1; i < 6; i++) {
    platforms.push(new Platform(random(width), height - i*gap));
  }
}

function draw() {
  background(255);
  
  
  bollObj.draw();
  cameraDown();
  
  if (bollObj.y < platforms[platforms.length - 1].y + 200) {
    platforms.push(new Platform(random(width), platforms[platforms.length - 1].y - gap));
    
  }

  
  if (bollObj.velocity < 0) { 
    score += Math.abs(bollObj.velocity);
  }




  for (let platform of platforms) {
    
    platform.draw();
  }

  platforms = platforms.filter(platform => platform.y < 650);

  if (bollObj.y < 300) {
    bollObj.y = 300;}

  function cameraDown() {
    if (bollObj.y < 300) {
      for (let platform of platforms) {
        platform.y += 5; // Move platforms down
      }
    }
  }

  resetMatrix();
  fill(0);
  textSize(24);
  text("Score: " + Math.floor(score), 10, 30);
  bollObj.update(platforms);
}