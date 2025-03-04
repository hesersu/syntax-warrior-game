class enemy {
  constructor(gameScreen) {
    this.left = 480;
    this.top = 150;
    this.width = 140;
    this.height = 150;
    this.element = document.createElement("img");
    this.element.src = "./images/enemy-img.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.zIndex = "1";
    this.element.style.filter =
      "drop-shadow(0px 150px 5px rgba(65, 65, 220, 0.4)";
    this.element.classList.add("enemy-class");
    gameScreen.appendChild(this.element);
  }
}
