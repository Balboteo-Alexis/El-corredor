// ============ MENÚ ============
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        // Título
        this.add.text(400, 100, "EL CORREDOR", {
            fontSize: '72px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Botón Nivel 1
        const btn1 = this.add.rectangle(400, 250, 200, 60, 0x00ff00);
        this.add.text(400, 250, "NIVEL 1", {
            fontSize: '32px',
            fill: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn1.setInteractive();
        btn1.on('pointerdown', () => this.scene.start('Level1'));

        // Botón Nivel 2
        const btn2 = this.add.rectangle(400, 380, 200, 60, 0x0088ff);
        this.add.text(400, 380, "NIVEL 2", {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn2.setInteractive();
        btn2.on('pointerdown', () => this.scene.start('Level2'));
    }
}

// ============ NIVEL 1 ============
class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }

    create() {
        // CURSORES
        let cursors = this.input.keyboard.createCursorKeys();

        // SUELO
        let ground = this.add.rectangle(400, 600 - 20, 800, 40, 0x555555);
        this.physics.add.existing(ground, true);
        
        // JUGADOR (forma de persona)
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1);
        
        // Cabeza (círculo)
        graphics.fillCircle(20, 10, 8);
        
        // Cuerpo (rectángulo)
        graphics.fillRect(16, 18, 8, 20);
        
        // Brazos (líneas gruesas)
        graphics.lineStyle(3, 0xff0000);
        graphics.lineBetween(16, 22, 8, 20);   // Brazo izquierdo
        graphics.lineBetween(24, 22, 32, 20);  // Brazo derecho
        
        // Piernas (líneas gruesas)
        graphics.lineBetween(18, 38, 14, 58);  // Pierna izquierda
        graphics.lineBetween(22, 38, 26, 58);  // Pierna derecha
        
        graphics.generateTexture('player_texture', 40, 60);
        graphics.destroy();
        
        let player = this.add.sprite(30, 300, 'player_texture');
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);
        player.body.setSize(40, 50);

        // Colisiones
        this.physics.add.collider(player, ground);


        // OBSTÁCULO SUELO INICIAL
        let obstacle1 = this.add.rectangle(500, 200, 200, 420, 0x444444);
        this.physics.add.existing(obstacle1, true);
        this.physics.add.collider(player, obstacle1);

        // OBSTÁCULO ARRIBA PASILLO
        let obstacle2 = this.add.rectangle(500, 530, 150, 60, 0x444444);
        this.physics.add.existing(obstacle2, true);
        this.physics.add.collider(player, obstacle2);


        // OBSTÁCULO ABAJO PASILLO
        let obstacle3 = this.add.rectangle(0, 530, 150, 60, 0x444444);
        this.physics.add.existing(obstacle3, true);
        this.physics.add.collider(player, obstacle3);



        // META
        let goal = this.add.rectangle(770, 520, 40, 80, 0x00ff00);
        this.physics.add.existing(goal, true);
        goal.body.setSize(40, 80);
        goal.body.setOffset(0,0);

        // Mensaje de meta alcanzada
        let message = this.add.text(400, 100, "¡META ALCANZADA!", {
            fontSize: '64px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        });
        message.setOrigin(0.5, 0);
        message.setVisible(false);

        // Botón Menú
        let btnMenu = this.add.rectangle(50, 20, 80, 30, 0xff6600);
        this.add.text(50, 20, "MENÚ", {
            fontSize: '14px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        btnMenu.setInteractive();
        btnMenu.on('pointerdown', () => this.scene.start('Menu'));

        // Detectar llegada a la meta
        this.physics.add.overlap(player, goal, () => {
            goal.setFillStyle(0xffff00);
            message.setVisible(true);
            
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        });

        // Guardar referencias para update
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        // MOVIMIENTO HORIZONTAL
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-250);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(250);
        } else {
            this.player.body.setVelocityX(0);
        }

        // SALTO con ↑ o ESPACIO
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
             Phaser.Input.Keyboard.JustDown(this.cursors.space)) &&
            this.player.body.blocked.down) {
            this.player.body.setVelocityY(-550);
        }
    }
}

// ============ NIVEL 2 (MÁS DIFÍCIL) ============
class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }

    create() {
        // CURSORES
        let cursors = this.input.keyboard.createCursorKeys();

        // SUELO
        let ground = this.add.rectangle(400, 600 - 20, 800, 40, 0x555555);
        this.physics.add.existing(ground, true);
        
        // JUGADOR (forma de persona)
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1);
        
        // Cabeza (círculo)
        graphics.fillCircle(20, 10, 8);
        
        // Cuerpo (rectángulo)
        graphics.fillRect(16, 18, 8, 20);
        
        // Brazos (líneas gruesas)
        graphics.lineStyle(3, 0xff0000);
        graphics.lineBetween(16, 22, 8, 20);   // Brazo izquierdo
        graphics.lineBetween(24, 22, 32, 20);  // Brazo derecho
        
        // Piernas (líneas gruesas)
        graphics.lineBetween(18, 38, 14, 58);  // Pierna izquierda
        graphics.lineBetween(22, 38, 26, 58);  // Pierna derecha
        
        graphics.generateTexture('player_texture', 40, 60);
        graphics.destroy();
        
        let player = this.add.sprite(150, 300, 'player_texture');
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);
        player.body.setSize(40, 60);

        // Colisiones
        this.physics.add.collider(player, ground);

        // OBSTÁCULOS (múltiples)
        let obstacle1 = this.add.rectangle(300, 480, 60, 60, 0x444444);
        this.physics.add.existing(obstacle1, true);
        this.physics.add.collider(player, obstacle1);

        let obstacle2 = this.add.rectangle(500, 420, 60, 60, 0x444444);
        this.physics.add.existing(obstacle2, true);
        this.physics.add.collider(player, obstacle2);

        // META
        let goal = this.add.rectangle(700, 460, 40, 80, 0x00ff00);
        this.physics.add.existing(goal, true);
        goal.body.setSize(40, 80);
        goal.body.setOffset(0,0);

        // Mensaje de meta alcanzada
        let message = this.add.text(400, 100, "¡META ALCANZADA!", {
            fontSize: '64px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        });
        message.setOrigin(0.5, 0);
        message.setVisible(false);

        // Etiqueta Nivel 2
        this.add.text(400, 20, "NIVEL 2", {
            fontSize: '24px',
            fill: '#0088ff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Botón Menú
        let btnMenu = this.add.rectangle(50, 20, 80, 30, 0xff6600);
        this.add.text(50, 20, "MENÚ", {
            fontSize: '14px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        btnMenu.setInteractive();
        btnMenu.on('pointerdown', () => this.scene.start('Menu'));

        // Detectar llegada a la meta
        this.physics.add.overlap(player, goal, () => {
            goal.setFillStyle(0xffff00);
            message.setVisible(true);
            
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        });

        // Guardar referencias para update
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        // MOVIMIENTO HORIZONTAL
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-250);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(250);
        } else {
            this.player.body.setVelocityX(0);
        }

        // SALTO con ↑ o ESPACIO
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
             Phaser.Input.Keyboard.JustDown(this.cursors.space)) &&
            this.player.body.blocked.down) {
            this.player.body.setVelocityY(-550);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222222',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },

    scene: [MenuScene, Level1, Level2]
};

const game = new Phaser.Game(config);
