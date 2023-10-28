import { Player } from "../entities/Player.js";
import { Lane } from "../entities/Lane.js";

/**
 * Main game scene.
 */
export class Game extends Phaser.Scene {
  constructor() {
    super("Game");

    this.player;
    this.lanes;

    this.score = 0;
    this.highscore = 0;

    this.scoreLabel;
    this.scoreText;
    this.highscoreLabel;
    this.highscoreText;
  }

  /**
   * Create the game scene.
   */
  create() {
    this.score = 0;
    this.highscore = this.registry.get("highscore");

    this.add.image(0, 0, "background").setOrigin(0, 0);

    this.lanes = [
      new Lane(this, 0, 100),
      new Lane(this, 1, 275),
      new Lane(this, 2, 450),
      new Lane(this, 3, 625),
    ];

    this.player = new Player(this, this.lanes[0]);

    this.scoreLabel = this.add.text(190, -20, "Score:", {
      fontFamily: "hwMadeline",
      fontSize: 100,
      color: "#000000",
    });

    this.scoreText = this.add.text(340, -20, this.score, {
      fontFamily: "hwMadeline",
      fontSize: 100,
      color: "#000000",
    });

    this.highscoreLabel = this.add.text(570, -20, "High score:", {
      fontFamily: "hwMadeline",
      fontSize: 100,
      color: "#000000",
    });

    this.highscoreText = this.add.text(810, -20, this.highscore, {
      fontFamily: "hwMadeline",
      fontSize: 100,
      color: "#000000",
    });

    this.input.keyboard.once("keydown-SPACE", this.start, this);
    this.input.keyboard.once("keydown-UP", this.start, this);
    this.input.keyboard.once("keydown-DOWN", this.start, this);
  }

  start() {
    this.input.keyboard.removeAllListeners();
    this.player.start();
    this.lanes.forEach((lane) => lane.start(2000, 5000));
  }
}
