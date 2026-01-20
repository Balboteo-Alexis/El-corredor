export class Level6 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level6' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        let ground = this.add.rectangle(400, 600 - 20, 800, 40, 0x555555);
        this.physics.add.existing(ground, true);
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1);
        graphics.fillCircle(20, 10, 8);
        graphics.fillRect(16, 18, 8, 20);
        graphics.lineStyle(3, 0xff0000);
        graphics.lineBetween(16, 22, 8, 20);
        graphics.lineBetween(24, 22, 32, 20);
        graphics.lineBetween(18, 38, 14, 58);
        graphics.lineBetween(22, 38, 26, 58);
        graphics.generateTexture('player_texture', 40, 60);
        graphics.destroy();
        let player = this.add.sprite(50, 540, 'player_texture');
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);
        player.body.setSize(40, 60);
        this.physics.add.collider(player, ground);
        let platforms = [];
        platforms.push(this.add.rectangle(200, 500, 100, 20, 0x00ffcc));
        platforms.push(this.add.rectangle(350, 420, 80, 20, 0xffcc00));
        platforms.push(this.add.rectangle(500, 350, 80, 20, 0x00ccff));
        platforms.push(this.add.rectangle(650, 280, 100, 20, 0xff00cc));
        platforms.push(this.add.rectangle(770, 200, 60, 20, 0x00ff88));
        platforms.forEach(platform => {
            this.physics.add.existing(platform, true);
            this.physics.add.collider(player, platform);
        });
        let goal = this.add.rectangle(770, 150, 40, 80, 0x00ff00);
        this.physics.add.existing(goal, true);
        goal.body.setSize(40, 80);
        goal.body.setOffset(0,0);
        let message = this.add.text(400, 100, "¡META ALCANZADA!", {
            fontSize: '64px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        });
        message.setOrigin(0.5, 0);
        message.setVisible(false);
        this.add.text(400, 20, "NIVEL 6", {
            fontSize: '24px',
            fill: '#00ff88',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        let btnMenu = this.add.rectangle(50, 20, 80, 30, 0xff6600);
        this.add.text(50, 20, "MENÚ", {
            fontSize: '14px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        btnMenu.setInteractive();
        btnMenu.on('pointerdown', () => this.scene.start('Menu'));
        this.physics.add.overlap(player, goal, () => {
            goal.setFillStyle(0xffff00);
            message.setVisible(true);
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        });
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-250);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(250);
        } else {
            this.player.body.setVelocityX(0);
        }
        if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
             Phaser.Input.Keyboard.JustDown(this.cursors.space)) &&
            this.player.body.blocked.down) {
            this.player.body.setVelocityY(-550);
        }
    }
}
