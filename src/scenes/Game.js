import { Player } from "../entities/Player.js";
import { Route } from "../entities/Route.js";

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");

    this.player;
    this.routes;
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);

    this.routes = [
      new Route(this, 0, 100),
      new Route(this, 1, 275),
      new Route(this, 2, 450),
      new Route(this, 3, 625),
    ];

    this.player = new Player(this, this.routes[0]);

    this.input.keyboard.once("keydown-SPACE", this.start, this);
    this.input.keyboard.once("keydown-UP", this.start, this);
    this.input.keyboard.once("keydown-DOWN", this.start, this);
  }

  start() {
    this.input.keyboard.removeAllListeners();
    this.player.start();
    this.routes.forEach((route) => route.start(2000, 5000));
  }
}
