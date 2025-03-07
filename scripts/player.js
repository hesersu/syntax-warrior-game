class player {
  constructor(
    gameScreen,
    positionLeft,
    positionTop,
    playerWidth,
    playerHeight,
    playerImgSrc
  ) {
    this.gameScreen = gameScreen;
    this.left = positionLeft;
    this.top = positionTop;
    this.width = playerWidth;
    this.height = playerHeight;
    this.directionX = 0;
    this.directionY = 0;

    // Image
    this.element = document.createElement("img");
    this.element.src = playerImgSrc;
    this.element.style.position = "absolute";
    this.element.style.zIndex = "3";
    this.element.style.filter =
      "drop-shadow(0px -10px 30px rgba(180, 28, 222, 0.71)";

    // Set up the default element's property values
    this.element.style.width = `${playerWidth}px`;
    this.element.style.height = `${playerHeight}px`;
    this.element.style.left = `${positionLeft}px`;
    this.element.style.top = `${positionTop}px`;
    // Audio
    this.hurt = new Audio("./sounds/player-hurt.wav");
    this.getHealth = new Audio("./sounds/soda-open.wav");
    // This adds the element to the page
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update player's position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 110) {
      this.top = this.gameScreen.offsetHeight - this.height - 110;
    }

    // Update the player's psition on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
