import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createObstacles, GOALS_CONFIG } from '../obstacles.js';

export class Level5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level5' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        let ground = createGround(this);
        let player = createPlayer(this, 50, 300);
        this.physics.add.collider(player, ground);
        
        // Crear obstáculos específicos de Level 5
        const obstacles = [
            { x: 200, y: 550, width: 120, height: 20, color: 0x00ffcc },
            { x: 350, y: 480, width: 40, height: 120, color: 0xcc00ff },
            { x: 500, y: 400, width: 100, height: 40, color: 0xffcc00 },
            { x: 650, y: 320, width: 40, height: 200, color: 0x00ccff },
            { x: 750, y: 250, width: 60, height: 60, color: 0xff2222 }
        ];
        createObstacles(this, obstacles, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level5.x, GOALS_CONFIG.level5.y);
        this.add.text(400, 20, "NIVEL 5", {
            fontSize: '24px',
            fill: '#ff8800',
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
