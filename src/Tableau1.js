class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled!
        this.load.image('player','assets/Robot.png');

        this.load.image('bg','assets/images/background.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {

        this.turn = false;


        this.bg = this.physics.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.bg.setDisplaySize( 800, 450);
        this.bg.body.setAllowGravity(false);
        this.bg.setVisible(true);
        this.bg.setVelocityY(0);

        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "game_tile",
            "tilemap"
        );

        // chargement du calque plateformes
        const platforms = map.createLayer(
            "calque_plateformes",
            tileset
        );

        // chargement du calque décors
        const decors = map.createLayer(
            "calque_objet_visible",
            tileset
        );

// chargement du calque décors
        const platfer = map.createLayer(
            "calque_decor",
            tileset
        );

        // Création du personnage de base
        this.player = this.physics.add.sprite(150, 200, 'player').setOrigin(0, 0);
        this.player.setDisplaySize( 64, 64);
        this.player.body.setAllowGravity(true);
        this.player.setVisible(true);
        this.player.setVelocityY(0);

        platforms.setCollisionByExclusion(-1, true);


        // Creation des collision


        this.physics.add.collider(this.player, platforms);
        // this.physics.add.collider(this.platfer, platforms);



        this.initKeyboard();
    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.

    checkCollider(Objet1x,Objet1y,Object1TailleLargeur,Object1TailleHauteur,Objet2x,Objet2y,Objet2TaileLargeur,Objet2TailleHauteur){
        if (Objet1x + Object1TailleLargeur > Objet2x && Objet1x < Objet2x + Objet2TaileLargeur
                                            &&
            Objet1y + Object1TailleHauteur > Objet2y && Objet1y < Objet2y + Objet2TailleHauteur) {
            // Si toutes les conditons sont vrais alors il y a bien un overlaps, on renvoie donc true/vrai a notre foncion sinon on ne renvoie rien
            return true
        }
    }


    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.player.setVelocityX(0);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.player.setVelocityX(0);

                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                        me.player.setVelocityX(-300);

                        me.turn = true;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.player.setVelocityX(300);

                        me.turn = false;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                        me.player.setVelocityY(-350);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:


                        break;

                        // une action qui pose l'arme que on as en main.

                case Phaser.Input.Keyboard.KeyCodes.A:

                    break;
            }
        })
    }

    update(){

        this.player.flipX = this.turn === true;

    }

    // fin du programme
}