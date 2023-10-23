import { Envelope } from "./Envelope.js";
import { Client } from "./Client.js";

export class Route {
  constructor(scene, id, y) {
    this.scene = scene;
    this.id = id;
    this.y = y;

    this.desk = this.scene.physics.add
      .image(30, this.y, "desk")
      .setOrigin(0, 0);

    this.walkingClient = new Client(this.scene, this, "walking");
    this.runningClient = new Client(this.scene, this, "running");

    this.playerEnvelopes = this.scene.physics.add.group({
      frameQuantity: 4,
      classType: Envelope,
      active: false,
      visible: false,
      key: "envelope",
    });

    this.clientCollider = this.scene.physics.add.overlap(
      this.walkingClient,
      this.playerEnvelopes,
      this.clientHitEnvelope,
      null,
      this
    );

    this.clientCollider = this.scene.physics.add.overlap(
      this.runningClient,
      this.playerEnvelopes,
      this.clientHitEnvelope,
      null,
      this
    );

    this.releaseTimerWalking;
    this.releaseTimerRunning;
  }

  start(minDelay, maxDelay) {
    const delay = Phaser.Math.Between(minDelay, maxDelay);

    this.releaseTimerWalking = this.scene.time.addEvent({
      delay: delay,
      callback: () => {
        this.walkingClient.start();
      },
    });

    this.releaseTimerRunning = this.scene.time.addEvent({
      delay: delay * 3,
      callback: () => {
        this.runningClient.start();
      },
    });
  }

  stop() {
    this.walkingClient.stop();
    this.runningClient.stop();

    for (let envelope of this.playerEnvelopes.getChildren()) {
      envelope.stop();
    }

    this.releaseTimerWalking.remove();
    this.releaseTimerRunning.remove();
  }

  clientHitEnvelope(client, envelope) {
    envelope.stop();
    client.hit();
  }

  launchEnvelope(x) {
    let envelope = this.playerEnvelopes.getFirstDead(false);

    if (envelope) {
      envelope.fly(x, this.y);
    }
  }

  hideDesk() {
    this.desk.setVisible(false);
  }

  showDesk() {
    this.desk.setVisible(true);
  }
}
