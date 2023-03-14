import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Matter.Image;

  preload() {
    this.load.tilemapTiledJSON("map1", "assets/tilemaps/maps/mario.json");
    this.load.image("tiles1", "assets/tilemaps/tiles/super_mario.png");
    this.load.image("tiles2", "assets/tilemaps/tiles/goomba_trans.png");
    this.load.image("player", "assets/tilemaps/tiles/mario_trans.png");
  }
  create() {
    this.matter.world.setBounds();
    const map1 = this.make.tilemap({ key: "map1" });
    const tileset1 = map1.addTilesetImage("super_mario", "tiles1");
    const tileset2 = map1.addTilesetImage("goomba_trans", "tiles2");

    map1.createLayer("Background", tileset1, 0, 0);
    const layer2 = map1.createLayer("Collide", [tileset1, tileset2], 0, 0);

    layer2.setCollision([14, 15, 40, 45]);

    // Convert the layer. Any colliding tiles will be given a Matter body. If a tile has collision
    // shapes from Tiled, these will be loaded. If not, a default rectangle body will be used. The
    // body will be accessible via tile.physics.matterBody.
    this.matter.world.convertTilemapLayer(layer2);

    this.player = this.matter.add.image(60, 100, "player", undefined, {
      label: "player",
    });
    this.player.setBounce(0.1);
    this.player.setFriction(1);

    this.matter.add.mouseSpring({ length: 1 });

    // this.matter.world.on("collisionstart", function (event: any) {
    //   console.log(event);
    //   event.pairs.forEach(({ collision }: any) => {
    //     console.log(collision);
    //     const { normal } = collision;
    //     console.log(normal);

    //     // determine the direction of the collision based on the normal vector
    //     // const  direction = new Phaser.Math.Vector2(normal.x, normal.y);

    //     // do something with the direction of the collision
    //     // console.log("Collision direction:", direction.toString());
    //   });
    // });
  }

  update() {
    this.player.setAngularVelocity(0);
  }
}
