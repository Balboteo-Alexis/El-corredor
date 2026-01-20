import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createObstacles, GOALS_CONFIG } from '../obstacles.js';

export class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        let ground = createGround(this);
        let player = createPlayer(this, 150, 300);
        this.physics.add.collider(player, ground);
        
        // Crear obstáculos específicos de Level 2
        const obstacles = [
            { x: 300, y: 480, width: 60, height: 60, color: 0x888888 },
            { x: 500, y: 420, width: 60, height: 60, color: 0x888888 }
        ];
        createObstacles(this, obstacles, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level2.x, GOALS_CONFIG.level2.y);
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
        
        btnMenu.setInteractive();
        btnMenu.on('pointerdown', () => this.scene.start('Menu'));
        
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        handlePlayerMovement(this.player, this.cursors, this);
    }
}
