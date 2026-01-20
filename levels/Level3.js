import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createObstacles, GOALS_CONFIG } from '../obstacles.js';

export class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        let ground = createGround(this);
        let player = createPlayer(this, 50, 300);
        this.physics.add.collider(player, ground);
        
        // Crear obstáculos específicos de Level 3
        const obstacles = [
            { x: 200, y: 500, width: 100, height: 30, color: 0x00ffff },
            { x: 400, y: 400, width: 60, height: 120, color: 0xff8800 },
            { x: 600, y: 350, width: 40, height: 200, color: 0x00ff88 }
        ];
        createObstacles(this, obstacles, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level3.x, GOALS_CONFIG.level3.y);
        this.add.text(400, 20, "NIVEL 3", {
            fontSize: '24px',
            fill: '#ff00ff',
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
