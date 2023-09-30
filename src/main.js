import "phaser";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game",
  scene: [],
  physics: {
    default: "arcade",
  },
};

const game = new Phaser.Game(config);
