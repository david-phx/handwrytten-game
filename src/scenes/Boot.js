/**
 * Boot scene.
 */
export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  /**
   * Load the highscore from local storage into the game registry and start
   * the Preloader scene.
   */
  create() {
    const savedHighScore = localStorage.getItem("highscore");

    if (savedHighScore && !isNaN(savedHighScore)) {
      this.registry.set("highscore", parseInt(savedHighScore));
    } else {
      this.registry.set("highscore", 0);
    }

    this.scene.start("Preloader");
  }
}
