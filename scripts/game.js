class game {
  constructor() {
    // Screens
    this.startScreen = document.getElementById("start-screen-div");
    this.gameScreen = document.getElementById("game-screen-div");
    this.gameoverScreen = document.getElementById("gameover-screen-div");
    this.gamewinScreen = document.getElementById("gamewin-screen-div");
    this.playerHealthBar = document.getElementById("player-status-bar");
    this.enemyHealthBar = document.getElementById("enemy-status-bar");
    this.battleScreen = document.getElementById("battle-screen-sec");
    this.battleCounterText = document.getElementById("battle-counter-text");
    this.battleStatusBar = document.getElementById("battle-progress-bar");
    this.battleStatusEnemy = document.getElementById("battle-screen-enemy");

    // Audio
    //! Remember to set the volume before showing
    this.globalVolume = 0.4;
    this.level1audio = new Audio("./music/level-1-bmg.mp3");
    this.level1audio.loop = true;
    this.level1audio.volume = this.globalVolume;
    this.gameOverAudio = new Audio("./music/game-over.mp3");
    this.gameOverAudio.loop = true;
    this.gameOverAudio.volume = this.globalVolume;
    this.gameWinAudio = new Audio("./music/game-win.mp3");
    this.gameWinAudio.loop = true;
    this.gameWinAudio.volume = this.globalVolume;
    this.UnstopableAudio = new Audio("./sounds/Unstopable.mp3");
    this.UnstopableAudio.volume = this.globalVolume * 2;
    this.DominatingAudio = new Audio("./sounds/Dominating.mp3");
    this.DominatingAudio.volume = this.globalVolume * 2;
    this.HolyAudio = new Audio("./sounds/HolyShit.mp3");
    this.HolyAudio.volume = this.globalVolume * 2;

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
    this.gameIsWon = false;
    this.gameIntervalId;
    this.bossIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.counter = 0;
    this.battleCounter = 0;
    this.projectileSpawnRate = 100;
    this.projectileGoodSpawnRate = 200;
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
    if (this.counter % this.projectileSpawnRate === 0) {
      this.projectile.push(new projectile(this.gameScreen));
    }

    if (this.counter % this.projectileGoodSpawnRate === 0) {
      this.projectileGood.push(new projectileGood(this.gameScreen));
    }

    this.update();

    //inside the game loop we check if the game is over
    if (this.gameIsWon) {
      this.gameWin();
    }

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
        currentProjectileGood.element.src =
          "./images/good-projectile-explosion.png";
        this.player.getHealth.volume = this.globalVolume;
        this.player.getHealth.play();
        this.projectileGood.splice(i, 1);
        i--;
        this.score += 1;
        if (this.lives < 100) {
          this.lives += 5;
          this.playerHealthBar.style.width = `${this.lives}%`;
        }
        if (this.score === 5) {
          this.score = 0;
          this.bossBattle();
        }
        //dont forget to remove the img element from the html
        const removeProjectile = setTimeout(() => {
          currentProjectileGood.element.remove();
        }, 100);
      }
    }
  }
  //! Boss Battle Part
  bossBattle() {
    // This switches to the new screen and pauses game
    clearInterval(this.gameIntervalId);
    this.gameScreen.style.display = "none";
    this.battleScreen.style.display = "flex";
    this.battleCounter = 0;
    // this does the countdown
    this.bossIntervalId = setInterval(() => {
      if (this.battleCounter > 1000) {
        this.battleCounterText.innerText = "Iron Hacker!";
        this.battleStatusBar.style.width = `98%`;
        this.battleStatusEnemy.style.animationDuration = "0.1s";
      } else if (this.battleCounter > 800) {
        this.battleCounterText.innerText = "1337 Hacking!";
        this.battleStatusBar.style.width = `80%`;
        this.battleStatusEnemy.style.animationDuration = "0.3s";
      } else if (this.battleCounter > 600) {
        this.battleCounterText.innerText = "Hack Faster!";
        this.battleStatusBar.style.width = `60%`;
        this.battleStatusEnemy.style.animationDuration = "0.5s";
      } else if (this.battleCounter > 400) {
        this.battleCounterText.innerText = "Hackbot's defenses are cracking!";
        this.battleStatusBar.style.width = `40%`;
        this.battleStatusEnemy.style.animationDuration = "0.8s";
      } else if (this.battleCounter > 200) {
        this.battleCounterText.innerText = "You make Hackbot laugh!";
        this.battleStatusBar.style.width = `20%`;
        this.battleStatusEnemy.style.animationDuration = "1s";
      } else if (this.battleCounter < 100) {
        this.battleCounterText.innerText = "Are you AFK?!?!?!";
        this.battleStatusBar.style.width = `0%`;
        this.battleStatusEnemy.style.animationDuration = "2s";
      }
      this.battleCounter -= 1;
    }, 8);
    // this checks score, removes lives and switches back to game
    const finishBossBattle = setTimeout(() => {
      if (this.battleCounter <= 500) {
        this.enemylives -= 10;
      } else if (this.battleCounter <= 700) {
        this.enemylives -= 20;
      } else if (this.battleCounter <= 900) {
        this.enemylives -= 25;
        this.UnstopableAudio.play();
      } else if (this.battleCounter <= 1000) {
        this.enemylives -= 30;
        this.DominatingAudio.play();
      } else if (this.battleCounter > 1000) {
        this.enemylives -= 40;
        this.HolyAudio.play();
      }
      // This checks if the game is won after remving lives
      if (this.enemylives <= 0) {
        this.gameIsWon = true;
      }
      console.log(this.enemylives);
      console.log(this.gameIsWon);
      // This increases game speed
      if (this.projectileGoodSpawnRate > 21 && this.projectileSpawnRate > 21) {
        this.projectileSpawnRate = this.projectileSpawnRate / 2;
        this.projectileGoodSpawnRate = this.projectileGoodSpawnRate;
      }
      this.gameScreen.style.display = "flex";
      this.battleScreen.style.display = "none";
      this.enemyHealthBar.style.width = `${this.enemylives}%`;
      clearInterval(this.bossIntervalId);
      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      }, this.gameLoopFrequency);
    }, 7000);
  }

  //! Game Won Part
  gameWin() {
    //stop the loop from running
    clearInterval(this.gameIntervalId);
    //hide the game screen
    this.gameScreen.style.display = "none";
    //show the game over screen
    this.gamewinScreen.style.display = "flex";
    this.level1audio.pause();
    this.level1audio.currentTime = 0;
    this.gameWinAudio.play();
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
