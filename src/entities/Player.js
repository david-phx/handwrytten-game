export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, route) {
    super(scene, 30, route.y, "player-sitting");
    this.setOrigin(0, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.currentRoute = route;
    this.currentRoute.hideDesk();

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
    this.currentRoute = this.scene.routes[0];
    this.y = this.currentRoute.y;
  }

  moveUp() {
    if (this.currentRoute.id > 0) {
      this.changeRoute(this.scene.routes[this.currentRoute.id - 1]);
    } else {
      this.changeRoute(this.scene.routes[this.scene.routes.length - 1]);
    }
  }

  moveDown() {
    if (this.currentRoute.id < this.scene.routes.length - 1) {
      this.changeRoute(this.scene.routes[this.currentRoute.id + 1]);
    } else {
      this.changeRoute(this.scene.routes[0]);
    }
  }

  changeRoute(newRoute) {
    this.currentRoute.showDesk();
    this.currentRoute = newRoute;
    this.currentRoute.hideDesk();
    this.y = this.currentRoute.y;
  }

  wryte() {
    this.setTexture("player-writing");
    this.currentRoute.launchEnvelope(this.x);
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
