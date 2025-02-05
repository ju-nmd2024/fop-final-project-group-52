export default class Platform {
    constructor(x, y) { 
        this.x = x;
        this.y = y; 
        this.width = 70;
        this.height = 15;
        this.speed = 0;
        this.breakable = false;


     
        if (random() < 0.9) {
            this.breakable = true;
        } else {
            this.breakable = false;
        }

        if (random() < 0.5) {
            this.speed = random([-2, 2]);
        } else {
            this.speed = 0;
        }
    }

    draw() {
        this.x += this.speed;
        if (this.x > 400 || this.x < 0) {
            this.speed *= -1;
        }

        if (this.breakable) {
            fill(255, 0, 0); // Different color for breakable platforms
          } else {
            fill(0, 255, 0);
          }
          rect(this.x, this.y, this.width, this.height);
    }
}
