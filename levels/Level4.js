import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createObstacles, GOALS_CONFIG } from '../obstacles.js';

export class Level4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level4' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        let ground = createGround(this);
        let player = createPlayer(this, 50, 300);
        this.physics.add.collider(player, ground);
        
        // Crear obstáculos específicos de Level 4
        const obstacles = [
            { x: 250, y: 550, width: 80, height: 20, color: 0x2222ff },
            { x: 400, y: 480, width: 40, height: 100, color: 0xff2222 },
            { x: 600, y: 400, width: 120, height: 40, color: 0x22ff22 },
            { x: 700, y: 300, width: 40, height: 200, color: 0xffff22 }
        ];
        createObstacles(this, obstacles, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level4.x, GOALS_CONFIG.level4.y);
        this.add.text(400, 20, "NIVEL 4", {
            fontSize: '24px',
            fill: '#ffff00',
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
        
        btnMenu.setInteractive();
        btnMenu.on('pointerdown', () => this.scene.start('Menu'));
        
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        handlePlayerMovement(this.player, this.cursors, this);
    }
}
