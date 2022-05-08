class Tableau1 extends Phaser.Scene {


    preload() {

        this.load.image('player','assets/Robot.png');
        this.load.image("sword", "assets/images/sword.png");




        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    onEvent()
    {
        this.sword.disableBody()
        this.sword.setVisible(false);
    }

    create() {

        this.turn = false;





        //SWORD

        this.sword = this.physics.add.sprite(150, 200, "sword").setScale(.1);
        this.sword.body.setAllowGravity(false);
        this.sword.setDepth(1);
        this.sword.setVisible(false);
        this.sword.attack = 100
        this.sword.disableBody()

        this.input.on('pointerdown', function (pointer) {

            //On rend l'épée visible
            this.sword.setVisible(true);
            //On active le body de l'épée
            this.sword.enableBody()
            //On ajoute un event avec un delay qui fera disparaitre l'épée pendant 250 ms
            this.time.addEvent({ delay: 250, callback: this.onEvent, callbackScope: this });

        }, this);







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


        this.cameras.main.startFollow(this.player);






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

                    if (me.player.body.onFloor()){
                        me.player.setVelocityY(-650);
                    }



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
        this.sword.x = this.player.x+110;
        this.sword.y = this.player.y+30;
        this.player.flipX = this.turn === true;
        this.sword.flipX = this.turn === true;
        if (this.turn === true){
            this.sword.X +50;
        }


    }

    // fin du programme
}