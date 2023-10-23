export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");

    this.loadText;
  }

  preload() {
    this.loadText = this.add
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
    // .setStroke("#203c5b", 6)
    // .setShadow(2, 2, "#2d2d2d", 4, true, false);

    this.load.setPath("/assets/images/");

    this.load.image("background", "paper-background.jpg");
    this.load.image("desk", "desk.png");
    this.load.image("player-sitting", "player-sitting.png");
    this.load.image("player-writing", "player-writing.png");
    this.load.image("envelope", "envelope.png");

    this.load.image("walk-1", "walk-1.png");
    this.load.image("walk-2", "walk-2.png");
    this.load.image("walk-3", "walk-3.png");
    this.load.image("walk-4", "walk-4.png");
    this.load.image("walk-5", "walk-5.png");
    this.load.image("walk-6", "walk-6.png");

    this.load.image("run-1", "run-1.png");
    this.load.image("run-2", "run-2.png");
    this.load.image("run-3", "run-3.png");
    this.load.image("run-4", "run-4.png");
    this.load.image("run-5", "run-5.png");
    this.load.image("run-6", "run-6.png");
    this.load.image("run-7", "run-7.png");
    this.load.image("run-8", "run-8.png");
  }

  create() {
    this.anims.create({
      key: "walk",
      frames: [
        { key: "walk-1" },
        { key: "walk-2" },
        { key: "walk-3" },
        { key: "walk-4" },
        { key: "walk-5" },
        { key: "walk-6" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: [
        { key: "run-1" },
        { key: "run-2" },
        { key: "run-3" },
        { key: "run-4" },
        { key: "run-5" },
        { key: "run-6" },
        { key: "run-7" },
        // { key: "run-8" },
      ],
      frameRate: 5,
      repeat: -1,
    });

    if (this.sound.locked) {
      this.loadText.setText("Click to start");

      this.input.once("pointerdown", () => {
        this.scene.start("Game");
      });
    } else {
      this.scene.start("Game");
    }
  }
}
