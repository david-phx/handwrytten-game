export class Client extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, track, type) {

        const frame = (type == "running") ? "run-1" : "walk-1";

        super(scene, 1000, 0, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);

        this.time = scene.time;
        this.sound = scene.sound;

        this.type = type;
        this.speed = (type == "running") ? -200 : -100;

        this.currentTrack = track;
    }

    start() {
        this.y = this.currentTrack.y + 80;
        this.setVisible(true);
        this.play((this.type == "running") ? "run" : "walk", true);

        this.setVelocityX(this.speed);
    }

    hit() {
        this.setVelocityX(0);
        this.anims.stop();
        this.setVisible(false);
    }
}
