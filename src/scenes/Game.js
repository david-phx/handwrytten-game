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
  }

  /**
   * Create the game scene.
   */
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);

    this.lanes = [
      new Lane(this, 0, 100),
      new Lane(this, 1, 275),
      new Lane(this, 2, 450),
      new Lane(this, 3, 625),
    ];

    this.player = new Player(this, this.lanes[0]);

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
