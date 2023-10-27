/**
 * Preloader scene.
 */
export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");

    this.loadingText;
  }

  /**
   * Load all the assets used by the game.
   */
  preload() {
    this.loadingText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Loading...",
        {
          fontFamily: "hwMadeline",
          fontSize: 200,
          color: "#000000",
        }
      )
      .setOrigin(0.5);

    this.load.setPath("/assets/images/");

    this.load.image("background", "paper-background.jpg");
    this.load.image("desk", "desk.png");
    this.load.image("player-sitting", "player-sitting.png");
    this.load.image("player-writing", "player-writing.png");
    this.load.image("envelope", "envelope.png");

    for (let i = 1; i <= 6; i++) {
      this.load.image(`walk-${i}`, `walk-${i}.png`);
    }

    for (let i = 1; i <= 8; i++) {
      this.load.image(`run-${i}`, `run-${i}.png`);
    }
  }

  /**
   * Create the animations used by the game and start the Game scene.
   */
  create() {
    this.anims.create({
      key: "walk",
      frames: (() => {
        const frameData = [];
        for (let i = 1; i <= 6; i++) {
          frameData.push({ key: `walk-${i}` });
        }
        return frameData;
      })(),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: (() => {
        const frameData = [];
        for (let i = 1; i <= 8; i++) {
          frameData.push({ key: `run-${i}` });
        }
        return frameData;
      })(),
      frameRate: 5,
      repeat: -1,
    });

    if (this.sound.locked) {
      this.loadingText.setText("Click to start");

      this.input.once("pointerdown", () => {
        this.scene.start("Game");
      });
    } else {
      this.scene.start("Game");
    }
  }
}
