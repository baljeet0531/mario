import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Matter.Image;

  preload() {
    this.load.tilemapTiledJSON(
      "map1",
      "assets/tilemaps/maps/mario480x800.json"
    );
    this.load.image("tiles1", "assets/tilemaps/tiles/super_mario2x.png");
    this.load.image("tiles2", "assets/tilemaps/tiles/goomba_trans2x.png");
    this.load.image("player", "assets/tilemaps/tiles/mario_trans2x.png");
    this.load.image("info1", "assets/info/intro1.png");
    this.load.image("info2", "assets/info/intro2.png");
    this.load.image("info3", "assets/info/intro3.png");
    this.load.image("info4", "assets/info/intro4.png");
  }
  create() {
    this.matter.world.setBounds();
    const map1 = this.make.tilemap({ key: "map1" });
    const tileSet1 = map1.addTilesetImage("super_mario2x", "tiles1");
    const tileSet2 = map1.addTilesetImage("goomba_trans2x", "tiles2");

    map1.createLayer("Background", tileSet1, 0, 0);
    const layer2 = map1.createLayer("Collide", [tileSet1, tileSet2], 0, 0);

    layer2.setCollision([14, 15, 40, 45]);

    this.matter.world.convertTilemapLayer(layer2).setBounds();

    this.player = this.matter.add.image(120, 736, "player", undefined, {
      label: "player",
    });
    this.player.setBounce(0.3);
    this.player.setFriction(0.9);

    this.matter.add.mouseSpring({ length: 1 });

    const infoImages = [
      this.add.image(240, 400, "info1"),
      this.add.image(240, 400, "info2"),
      this.add.image(240, 400, "info3"),
      this.add.image(240, 400, "info4"),
    ];
    infoImages.forEach((infoImage) => {
      infoImage.setVisible(false);
      infoImage.setInteractive();
      infoImage.on("pointerdown", () => {
        infoImage.setVisible(false);
      });
    });

    this.matter.world.on("collisionstart", (event: any) => {
      event.pairs.forEach(({ collision }: any) => {
        const { id } = collision.bodyA;
        const { y } = collision.normal;
        if (id === 13 && y === 1) {
          infoImages[0].setVisible(true);
        } else if (id === 11 && y === -1) {
          infoImages[1].setVisible(true);
        } else if (id === 9 && y === -1) {
          infoImages[2].setVisible(true);
        } else if (id === 5 && y === -1) {
          infoImages[3].setVisible(true);
        }
      });
    });
  }

  update() {
    this.player.setAngularVelocity(0);
    if (this.player.x > 480) {
      this.player.setX(480);
      this.player.setVelocity(0);
    }
    if (this.player.x < 0) {
      this.player.setX(0);
      this.player.setVelocity(0);
    }
    if (this.player.y > 736) {
      this.player.setY(720);
      this.player.setVelocity(0);
    }
    if (this.player.y < 0) {
      this.player.setY(0);
      this.player.setVelocity(0);
    }
  }
}
