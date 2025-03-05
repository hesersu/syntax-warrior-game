class projectile {
  constructor(gameScreen) {
    this.projectileArray = [
      {
        spawnPosition: 500,
        directionX: 0,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: -1,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 1,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 2,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 3,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 4,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 5,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 6,
        directionY: 3,
      },
      {
        spawnPosition: 500,
        directionX: 7,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: 0,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: 1,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -1,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -2,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -3,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -4,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -5,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -6,
        directionY: 3,
      },
      {
        spawnPosition: 580,
        directionX: -7,
        directionY: 3,
      },
    ];
    this.randomIndex = Math.floor(Math.random() * this.projectileArray.length);
    this.left = this.projectileArray[this.randomIndex].spawnPosition;
    this.top = 190;
    this.width = 20;
    this.height = 20;
    this.directionX = this.projectileArray[this.randomIndex].directionX;
    this.directionY = this.projectileArray[this.randomIndex].directionY;
    this.element = document.createElement("img");
    this.element.src = "./images/projectile-img.png";
    this.element.style.position = "absolute";
    // this.element.style.top = `${this.top}px`;
    // this.element.style.left = `${this.left}px`;
    // this.element.style.width = `${this.width}px`;
    // this.element.style.height = `${this.height}px`;
    this.element.style.zIndex = "2";
    this.element.style.filter =
      "drop-shadow(0px 150px 5px rgba(65, 65, 220, 0.1)";
    //Audio
    this.explosion = new Audio("./sounds/projectile-explosion.wav");
    gameScreen.appendChild(this.element);
  }
  move() {
    this.left -= this.directionX;
    this.top += this.directionY;
    this.width += 1;
    this.height += 1;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }
}

// Good Projectile

class projectileGood {
  constructor(gameScreen) {
    this.projectileArray = [
      {
        spawnPosition: 50,
      },
      {
        spawnPosition: 100,
      },
      {
        spawnPosition: 150,
      },
      {
        spawnPosition: 200,
      },
      {
        spawnPosition: 250,
      },
      {
        spawnPosition: 300,
      },
      {
        spawnPosition: 350,
      },
      {
        spawnPosition: 400,
      },
      {
        spawnPosition: 450,
      },
      {
        spawnPosition: 500,
      },
      {
        spawnPosition: 550,
      },
      {
        spawnPosition: 600,
      },
      {
        spawnPosition: 650,
      },
      {
        spawnPosition: 700,
      },
      {
        spawnPosition: 750,
      },
      {
        spawnPosition: 800,
      },
      {
        spawnPosition: 850,
      },
      {
        spawnPosition: 900,
      },
    ];
    this.randomIndex = Math.floor(Math.random() * this.projectileArray.length);
    this.left = this.projectileArray[this.randomIndex].spawnPosition;
    this.top = -50;
    this.width = 30;
    this.height = 30;
    this.directionX = 0;
    this.directionY = 2;
    this.element = document.createElement("img");
    this.element.src = "./images/good-projectile-img.png";
    this.element.style.position = "absolute";
    this.element.style.zIndex = "2";
    this.element.style.filter =
      "drop-shadow(0px 150px 5px rgba(65, 65, 220, 0.1)";
    //Audio
    this.evilLaugh = new Audio("./sounds/robot-laugh.wav");
    gameScreen.appendChild(this.element);
  }
  move() {
    this.left -= this.directionX;
    this.top += this.directionY;
    this.width += 0.2;
    this.height += 0.2;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }
}
