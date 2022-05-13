class Tableau1 extends Phaser.Scene {


    preload() {

        //this.load.image('player', 'assets/Robot.png');



        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");

        for(let i=1;i<=5;i++){
            this.load.image('player'+i, 'assets/idle/idle'+i+'.png');
        }
    }


    onEvent() {
    }

    create() {

        this.turn = false;


        this.largeurniveau = 8064;
        this.hauteurniveau = 8064;
        this.largeurcamera = 1200;
        this.hauteurcamera = 640;


        this.cursors = this.input.keyboard.createCursorKeys();

        //CAMERA
        this.zoom = 1.5;
        this.cameras.main.setZoom(this.zoom);




        this.speed = {
            speedDash: 1,
        }

        this.dash = this.tweens.add({
            targets: this.speed,
            speedDash: 0,
            ease: "Circ.easeInOut", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,
            //onUpdate : function (){
                //this.player.setVelocityX(900 * this.speedDash);
            //}

        });


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

        platforms.setCollisionByExclusion(-1, true);

        // Création du personnage de base
        this.player = this.physics.add.sprite(150, 200, 'player1').setOrigin(0, 0);
        this.player.setDisplaySize(64, 64);
        this.player.body.setAllowGravity(true);
        this.player.setVisible(true);
        this.player.setVelocityY(0);
        this.player.scale = 0.6


        this.anims.create({
            key: 'player',
            //frames: this.getFrames('player', 5),
            frames: [
                {key:'player1'},
                {key:'player2'},
                {key:'player3'},
                {key:'player4'},
                {key:'player5'},
            ],
            frameRate: 5,
            repeat: -1,
        });
        this.player.play('player');




        // Creation des collision
        this.physics.add.collider(this.player, platforms);
        // this.physics.add.collider(this.platfer, platforms);


        this.cameras.main.startFollow(this.player);


        this.initKeyboard();
    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.

    checkCollider(Objet1x, Objet1y, Object1TailleLargeur, Object1TailleHauteur, Objet2x, Objet2y, Objet2TaileLargeur, Objet2TailleHauteur) {
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

                    me.leftDown = false
                    me.player.setVelocityX(0);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rightDown = false;
                    me.player.setVelocityX(0);

                    break;


                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = false;
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.player.setVelocityX(-200);
                    me.leftDown=true;
                    me.gauche = true;


                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.rightDown = true
                        me.player.setVelocityX(300);

                        me.turn = false;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                    if (me.player.body.onFloor()){
                        me.player.setVelocityY(-650);
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown = true;
                    break;


            }
        })
    }

    update(){


        this.player.flipX = this.turn === true;







        if (this.shiftDown && this.rightDown) {
            if (this.flag) {

            } else {
                this.dash.play();
                this.flag = true;
            }
            this.player.setVelocityX(800 * this.speed.speedDash);
            console.log(this.speed.speedDash);
        }

        if (this.shiftDown && this.leftDown) {
            if (this.flag) {

            } else {
                this.dash.play();
                this.flag = true;
            }
            this.player.setVelocityX(-800 * this.speed.speedDash);
            console.log(this.speed.speedDash);
        }

        if (!this.shiftDown) {
            if (this.flag) {
                this.flag = false;
            }
        }

        if (!this.shiftDown && this.rightDown) {
            this.player.setVelocityX(200);
        } else if (!this.shiftDown && this.leftDown) {
            this.player.flipX = true;
            this.player.setVelocityX(-200);
        }










    }

    // fin du programme
}