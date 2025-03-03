class game {
  constructor() {
    this.startScreen = document.getElementById("start-screen-div");
    this.gameScreen = document.getElementById("game-screen-div");
    this.gameoverScreen = document.getElementById("gameover-screen-div");
    this.player = null;
    this.height = 619;
    this.width = 1100;
    this.enemyProjectiles = [];
    this.score = 0;
    this.lives = 100;
    this.gameOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "flex";

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    console.log("in the game loop");

    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    console.log("in the update");
  }
}
