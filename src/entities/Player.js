export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, lane) {
    super(scene, 30, lane.y, "player-sitting");
    this.setOrigin(0, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.currentLane = lane;
    this.currentLane.hideDesk();

    this.spacebar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
  }

  start() {
    this.currentLane = this.scene.lanes[0];
    this.y = this.currentLane.y;
  }

  moveUp() {
    if (this.currentLane.id > 0) {
      this.changeLane(this.scene.lanes[this.currentLane.id - 1]);
    } else {
      this.changeLane(this.scene.lanes[this.scene.lanes.length - 1]);
    }
  }

  moveDown() {
    if (this.currentLane.id < this.scene.lanes.length - 1) {
      this.changeLane(this.scene.lanes[this.currentLane.id + 1]);
    } else {
      this.changeLane(this.scene.lanes[0]);
    }
  }

  changeLane(newLane) {
    this.currentLane.showDesk();
    this.currentLane = newLane;
    this.currentLane.hideDesk();
    this.y = this.currentLane.y;
  }

  wryte() {
    this.setTexture("player-writing");
    this.currentLane.launchEnvelope(this.x);
    console.log(`this.x=${this.x}`);
    this.scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.setTexture("player-sitting");
      },
      callbackScope: this,
      loop: false,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (Phaser.Input.Keyboard.JustDown(this.up)) {
      this.moveUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.down)) {
      this.moveDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.wryte();
    }
  }
}
