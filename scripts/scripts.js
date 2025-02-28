// Audio
let musicTimer;

musicTimer = setTimeout(() => {
  let backgroundMusic = new Audio("./music/start-screen-bmg.mp3");
  backgroundMusic.volume = 0.4;
  backgroundMusic.play();
}, 500);

// Elements

const menuButtons = document.getElementById("menuButton");

// Functions

// menuButtons.addEventListener("mouseover", () => {
//   menuButtons.style.filter = "drop-shadow(0px 0px 5px rgb(0, 0, 0))";
// });

// menuButtons.addEventListener("mouseout", () => {
//   menuButtons.style.filter = "drop-shadow(0px 0px 3px rgb(0, 0, 0))";
// });
