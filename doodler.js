export default class doodler {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 40;
    this.velocity = 0;
    this.gravity = 0.3;
    this.jumpForce = 8;
  }

  draw() {
    rect(this.x, this.y, this.width, this.height);
  }

  update(platforms) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 8;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 8;
    }

    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    if (this.velocity < -8) this.velocity = -8;

    for (let i = platforms.length - 1; i >= 0; i--) {
      let platform = platforms[i];

      if (this.y + this.height >= platform.y && this.y + this.height <= platform.y + platform.height) {
        let minX = platform.x - this.width;
        let maxX = platform.x + platform.width;

        if (this.x >= minX && this.x <= maxX) {
          if (platform.brittle) {
            this.jump();
            platforms.splice(i, 1); // Remove the platform after bouncing on it once
          } else {
            this.jump();
          }
        }
      }
    }
  }

  jump() {
    this.velocity = -this.jumpForce; // Adjust the velocity to simulate a jump
  }
}
