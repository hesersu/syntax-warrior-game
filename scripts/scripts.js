this.window.onload = function () {
  //! All Elements Here
  const buttonSound = new Audio("./sounds/start-click.mp3");
  const startButtonElement = document.getElementById("startButton");
  const restartButtonElementLose = document.getElementById("restartButtonLose");
  const restartButtonElementWin = document.getElementById("restartButtonWin");
  const gameMenuAudio = new Audio("./music/start-screen-bmg.mp3");
  const keyboardClick = new Audio("./sounds/keyboard-click.wav");
  let newStartedGame;

  gameMenuAudio.play();

  //! All Event Listeners Here
  startButtonElement.addEventListener("mouseover", () => {
    startButtonElement.style.filter =
      "drop-shadow(0px 0px 10px rgb(99, 0, 106))";
    buttonSound.volume = 0.4;
    buttonSound.play();
  });

  startButtonElement.addEventListener("mouseout", () => {
    startButtonElement.style.filter =
      "drop-shadow(0px 0px 3px rgb(99, 0, 106))";
    buttonSound.pause();
    buttonSound.currentTime = 0;
  });
  startButtonElement.addEventListener("click", function () {
    gameMenuAudio.pause();
    startGame();
  });

  // Restart button

  restartButtonElementLose.addEventListener("click", () => {
    newStartedGame.gameOverAudio.pause();
    newStartedGame.gameOverAudio.currentTime = 0;
    window.location.reload();
  });

  restartButtonElementWin.addEventListener("click", () => {
    newStartedGame.gameOverAudio.pause();
    newStartedGame.gameOverAudio.currentTime = 0;
    window.location.reload();
  });

  //! All Functions Here
  //* Start Game Function
  function startGame() {
    console.log("Start game!");
    newStartedGame = new game();
    newStartedGame.start();
  }

  //* Keyboard Functions
  // Function that handles keydown event
  //keyboard event listeners

  // This controls the character
  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      newStartedGame.player.directionX = -15;
    } else if (event.code === "ArrowRight") {
      newStartedGame.player.directionX = 15;
    } else if (event.code === event.code) {
      newStartedGame.battleCounter += 8;
      keyboardClick.volume = 1;
      keyboardClick.play();
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
      newStartedGame.player.directionX = 0;
    } else if (e.code === "ArrowRight") {
      newStartedGame.player.directionX = 0;
    } else if (e.code === e.code) {
      newStartedGame.battleCounter += 0;
    }
  });
};

// // Functions

startButtonElement.addEventListener("mouseover", () => {
  startButtonElement.style.filter = "drop-shadow(0px 0px 10px rgb(99, 0, 106))";
  buttonSound.volume = 0.4;
  buttonSound.play();
});

startButtonElement.addEventListener("mouseout", () => {
  startButtonElement.style.filter = "drop-shadow(0px 0px 3px rgb(99, 0, 106))";
  buttonSound.pause();
  buttonSound.currentTime = -5;
});
