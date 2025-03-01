// Audio
let backgroundMusic = new Audio("./music/start-screen-bmg.mp3");
backgroundMusic.preload = "auto";
let buttonSound = new Audio("./sounds/start-click.mp3");
buttonSound.preload = "auto";

setTimeout(() => {
  backgroundMusic.volume = 0.4;
  backgroundMusic.loop = true;
  backgroundMusic.play();
}, 3000);

// Elements

const menuButtons = document.getElementById("menuButton");

// Functions

menuButtons.addEventListener("mouseover", () => {
  menuButtons.style.filter = "drop-shadow(0px 0px 10px rgb(99, 0, 106))";
  buttonSound.play();
});

menuButtons.addEventListener("mouseout", () => {
  menuButtons.style.filter = "drop-shadow(0px 0px 3px rgb(99, 0, 106))";
  buttonSound.pause();
  buttonSound.currentTime = -5;
});
