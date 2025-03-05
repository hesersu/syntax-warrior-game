class game {
  constructor() {
    // Screens
    this.startScreen = document.getElementById("start-screen-div");
    this.gameScreen = document.getElementById("game-screen-div");
    this.gameoverScreen = document.getElementById("gameover-screen-div");
    this.playerHealthBar = document.getElementById("player-status-bar");
    this.battleScreen = document.getElementById("battle-screen-sec");
    this.battleCounterText = document.getElementById("battle-counter-text");

    // Audio
    //! Remember to set the volume before showing
    this.globalVolume = 0.4;
    this.level1audio = new Audio("./music/level-1-bmg.mp3");
    this.level1audio.loop = true;
    this.level1audio.volume = this.globalVolume;
    this.gameOverAudio = new Audio("./music/game-over.mp3");
    this.gameOverAudio.loop = true;
    this.gameOverAudio.volume = this.globalVolume;
    // Player

    this.player = new player(
      this.gameScreen,
      500,
      500,
      90,
      90,
      "./images/player-img.png"
    );

    // Canvas
    this.height = 619;
    this.width = 1100;
    this.obstacles = [];
    this.enemy = [new enemy(this.gameScreen)];
    this.projectile = [new projectile(this.gameScreen)];
    this.projectileGood = [new projectileGood(this.gameScreen)];
    this.score = 0;
    this.lives = 100;
    this.enemylives = 100;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.counter = 0;
    this.battleCounter = 0;
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
    if (this.counter % 60 === 0) {
      this.projectile.push(new projectile(this.gameScreen));
    }

    if (this.counter % 600 === 0) {
      this.projectileGood.push(new projectileGood(this.gameScreen));
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
    //* This is the Projectile Logic
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
        currentProjectile.element.src = "./images/projectile-explosion.png";
        this.player.hurt.volume = this.globalVolume;
        this.player.hurt.play();
        this.projectile.splice(i, 1);
        i--;
        this.lives -= 20;
        this.playerHealthBar.style.width = `${this.lives}%`;
        //after we subtract health, we check if its zero
        if (this.lives <= 0) {
          this.gameIsOver = true;
        }
        setTimeout(() => {
          //dont forget to remove the img element from the html
          currentProjectile.element.remove();
          console.log(this.lives);
        }, 100);
      }
    }
    //*This is for the Good Projectile
    for (let i = 0; i < this.projectileGood.length; i++) {
      const currentProjectileGood = this.projectileGood[i];
      currentProjectileGood.move();
      //check if projectile hits wallds
      if (
        currentProjectileGood.top > 450 ||
        currentProjectileGood.left > 1010 ||
        currentProjectileGood.left < 10
      ) {
        currentProjectileGood.element.src = "./images/projectile-explosion.png";
        currentProjectileGood.evilLaugh.volume = this.globalVolume;
        currentProjectileGood.evilLaugh.play();
        this.projectileGood.splice(i, 1);
        i--;
        console.log(this.score);
        setTimeout(() => {
          currentProjectileGood.element.remove();
          console.log(this.lives);
        }, 100);
      }
      //check if the obstacle is colliding with the player
      if (this.player.didCollide(currentProjectileGood)) {
        currentProjectileGood.element.src = "./images/projectile-explosion.png";
        this.player.getHealth.volume = this.globalVolume;
        this.player.getHealth.play();
        this.projectileGood.splice(i, 1);
        i--;
        this.score += 1;
        if (this.lives < 100) {
          this.lives += 5;
          this.playerHealthBar.style.width = `${this.lives}%`;
        }
        if (this.score === 3) {
          this.score = 0;
          this.bossBattle();
        }
        //dont forget to remove the img element from the html
        setTimeout(() => {
          currentProjectileGood.element.remove();
          console.log(this.lives);
        }, 100);
      }
    }
  }
  //! Boss Battle Part
  bossBattle() {
    // This switches to the new screen and pauses game
    clearInterval(this.battleCounter);
    this.battleCounter = 10;
    clearInterval(this.gameIntervalId);
    this.gameScreen.style.display = "none";
    this.battleScreen.style.display = "flex";
    this.battleCounter = 1000;
    setInterval(() => {
      this.battleCounterText.innerText = this.battleCounter;
      this.battleCounter -= 1;
    }, 3);
    setTimeout(() => {
      if (this.battleCounter > 1200) {
        this.enemylives -= 20;
        console.log("Enemy lives" + this.enemylives);
      } else if (this.battleCounter > 1000) {
        this.enemylives -= 15;
        console.log("Enemy lives" + this.enemylives);
      } else if (this.battleCounter > 900) {
        this.enemylives -= 10;
        console.log("Enemy lives" + this.enemylives);
      } else if (this.battleCounter > 700) {
        this.enemylives -= 5;
        console.log("Enemy lives" + this.enemylives);
      } else if (this.battleCounter < 699) {
        this.enemylives -= 0;
        console.log("Enemy lives" + this.enemylives);
      }
      this.gameScreen.style.display = "flex";
      this.battleScreen.style.display = "none";
      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      }, this.gameLoopFrequency);
    }, 5000);
  }

  //! Game Over Part
  gameOver() {
    //stop the loop from running
    clearInterval(this.gameIntervalId);
    //hide the game screen
    this.gameScreen.style.display = "none";
    //show the game over screen
    this.gameoverScreen.style.display = "flex";
    this.level1audio.pause();
    this.level1audio.currentTime = 0;
    this.gameOverAudio.play();
  }
}
