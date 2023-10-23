export class Envelope extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);

    this.setScale(0.5);
  }

  fly(x, y) {
    this.body.enable = true;
    this.body.reset(x + 75, y + 35);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(200);
    this.setAccelerationX(50);

    // this.setBounce(1, 1);
    // this.setCollideWorldBounds(true);
  }

  stop() {
    this.setActive(false);
    this.setVisible(false);

    this.setVelocityX(0);

    this.body.enable = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.x >= 1024) {
      this.stop();
    }
  }
}
