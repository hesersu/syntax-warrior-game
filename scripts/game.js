class game {
  constructor() {
    // Screens
    this.startScreen = document.getElementById("start-screen-div");
    this.gameScreen = document.getElementById("game-screen-div");
    this.gameoverScreen = document.getElementById("gameover-screen-div");
    this.playerHealthBar = document.getElementById("player-status-bar");

    // Audio
    //! Remember to set the volume before showing
    this.globalVolume = 0.4;
    this.level1audio = new Audio("./music/level-1-bmg.mp3");
    this.level1audio.loop = true;
    this.level1audio.volume = this.globalVolume;
    // Player

    this.player = new player(
      this.gameScreen,
      500,
      500,
      100,
      100,
      "./images/player-img.png"
    );

    // Canvas
    this.height = 619;
    this.width = 1100;
    this.obstacles = [];
    this.enemy = [new enemy(this.gameScreen)];
    this.projectile = [new projectile(this.gameScreen)];
    this.score = 0;
    this.lives = 100;
    this.enemylives = 100;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.counter = 0;
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.level1audio.play();

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "flex";

    // Start Audio
    this.level1audio.play();

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // console.log("in the game loop");
    this.counter++;
    // console.log(this.counter);
    if (this.counter % 40 === 0) {
      this.projectile.push(new projectile(this.gameScreen));
    }

    this.update();

    //inside the game loop we check if the game is over
    if (this.gameIsOver) {
      this.gameOver();
    }
  }

  update() {
    // console.log("in the update");
    this.player.move();
    // Projectile Logic
    for (let i = 0; i < this.projectile.length; i++) {
      const currentProjectile = this.projectile[i];
      currentProjectile.move();
      // Screen Collision
      if (
        currentProjectile.top > 450 ||
        currentProjectile.left > 1010 ||
        currentProjectile.left < 10
      ) {
        currentProjectile.element.src = "./images/projectile-explosion.png";
        currentProjectile.explosion.volume = this.globalVolume;
        currentProjectile.explosion.play();
        this.projectile.splice(i, 1);
        i--;
        this.lives -= 0;
        setTimeout(() => {
          currentProjectile.element.remove();
          console.log(this.lives);
        }, 100);
      }
      // Player Collision
      if (this.player.didCollide(currentProjectile)) {
        //remove the red car from the array in JS
        currentProjectile.element.src = "./images/projectile-explosion.png";
        this.player.hurt.volume = this.globalVolume;
        this.player.hurt.play();
        this.projectile.splice(i, 1);
        i--;
        this.lives -= 5;
        this.playerHealthBar.style.width = `${this.lives}%`;
        //after we subtract health, we check if its zero
        if (this.lives === 0) {
          this.gameIsOver = true;
        }
        setTimeout(() => {
          //dont forget to remove the img element from the html
          currentProjectile.element.remove();
          console.log(this.lives);
        }, 100);
      }
    }
  }
  //! Game Over Part
  gameOver() {
    //stop the loop from running
    clearInterval(this.gameIntervalId);
    //hide the game screen
    this.gameScreen.style.display = "none";
    //show the game over screen
    this.gameoverScreen.style.display = "flex";
  }
}
