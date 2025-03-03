window.onload = function () {
  //! All Elements Here
  const startButtonElement = document.getElementById("startButton");
  const restartButtonElement = document.getElementById("restartButton");
  let newStartedGame;

  //! All Event Listeners Here
  startButtonElement.addEventListener("click", function () {
    startGame();
  });

  //! All Functions Here
  function startGame() {
    console.log("Start game!");
    newStartedGame = new game();
    newStartedGame.start();
  }
};

// Old Game

// let buttonSound = new Audio("./sounds/start-click.mp3");
// buttonSound.preload = "auto";
// // Elements

// const menuButtons = document.getElementById("menuButton");

// // Functions

// menuButtons.addEventListener("mouseover", () => {
//   menuButtons.style.filter = "drop-shadow(0px 0px 10px rgb(99, 0, 106))";
//   buttonSound.volume = 0.4;
//   buttonSound.play();
// });

// menuButtons.addEventListener("mouseout", () => {
//   menuButtons.style.filter = "drop-shadow(0px 0px 3px rgb(99, 0, 106))";
//   buttonSound.pause();
//   buttonSound.currentTime = -5;
// });
