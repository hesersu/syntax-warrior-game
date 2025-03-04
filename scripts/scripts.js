window.onload = function () {
  //! All Elements Here
  const buttonSound = new Audio("./sounds/start-click.mp3");
  const startButtonElement = document.getElementById("startButton");
  const restartButtonElement = document.getElementById("restartButton");
  let newStartedGame;

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
    buttonSound.currentTime = -5;
  });
  startButtonElement.addEventListener("click", function () {
    startGame();
  });

  // Restart button

  restartButtonElement.addEventListener("click", () => {
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
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
      newStartedGame.player.directionX = 0;
    } else if (e.code === "ArrowRight") {
      newStartedGame.player.directionX = 0;
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
