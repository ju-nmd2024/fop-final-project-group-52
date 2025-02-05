import Platform from "./platfrom.js";
import doodler from "./doodler.js";

let bollObj;
let gap;
let score = 0;
let platforms = [];
let state = "start";
let survivalTime = 0; 

function setup() {
  createCanvas(500, 650);

    
  bollObj = new doodler(200,350);

  let numbPlatforms = 6;
    gap = height / numbPlatforms;
    for (let i = 1; i < 6; i++) {
      let brittle = random() < 0.3;
      platforms.push(new Platform(random(width), height - i*gap));     
    }
}

function startScreen() {
  background(0);
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Press Enter to Start", 300, 300);
  if (keyIsDown(ENTER)) {
    state = "game";
  }
}

function gameScreen() {
  
  background(255);
  
  
  bollObj.draw();




  cameraDown();
  
  if (bollObj.y < platforms[platforms.length - 1].y + 200) {
    platforms.push(new Platform(random(width), platforms[platforms.length - 1].y - gap));
    
  }

  
  survivalTime += deltaTime / 1000; // Convert ms to seconds
  scoreMultiplier = 1 + survivalTime * 0.2; // Score grows faster the longer you last
  score += scoreMultiplier * (deltaTime / 1000); // Increase score over time




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
  if (bollObj.y > 650) {
    state = "result";
}
}

function resultScreen() {
  background(0);
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Game Over", width / 2, 300);
  text("Score: " + Math.floor(score), width / 2, 350);
  text("Press Enter to Restart", width / 2, 400);

  if (keyIsDown(ENTER)) {
    state = "game";
    bollObj = new doodler(200, 350); 
    score = 0;
    survivalTime = 0;
    scoreMultiplier = 1;
    platforms = []; 

    
    let numbPlatforms = 6;
    gap = height / numbPlatforms;
    for (let i = 1; i < 6; i++) {
      platforms.push(new Platform(random(width), height - i * gap));
    }
  }
}


function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result"){
    resultScreen();
  }
  
}