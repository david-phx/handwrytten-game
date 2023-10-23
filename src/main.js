import "phaser";

import "./style.css";

import { Boot } from "./scenes/Boot.js";
import { Preloader } from "./scenes/Preloader.js";
import { Game } from "./scenes/Game.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: "#EAEBEF",
  parent: "game",
  scene: [Boot, Preloader, Game],
  physics: {
    default: "arcade",
  },
};

const game = new Phaser.Game(config);
