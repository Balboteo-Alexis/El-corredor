export class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
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
        let player = this.add.sprite(150, 300, 'player_texture');
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);
        player.body.setSize(40, 60);
        this.physics.add.collider(player, ground);
        let obstacle1 = this.add.rectangle(300, 480, 60, 60, 0x888888);
        this.physics.add.existing(obstacle1, true);
        this.physics.add.collider(player, obstacle1);
        let obstacle2 = this.add.rectangle(500, 420, 60, 60, 0x888888);
        this.physics.add.existing(obstacle2, true);
        this.physics.add.collider(player, obstacle2);
        let goal = this.add.rectangle(700, 460, 40, 80, 0x00ff00);
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
        this.add.text(400, 20, "NIVEL 2", {
            fontSize: '24px',
            fill: '#0088ff',
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
