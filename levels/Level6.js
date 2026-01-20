import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createPlatforms, LEVEL6_PLATFORMS, GOALS_CONFIG } from '../obstacles.js';

export class Level6 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level6' });
    }

    create() {
        let cursors = this.input.keyboard.createCursorKeys();
        
        // Usar funciones del archivo de estilos
        let ground = createGround(this);
        let player = createPlayer(this, 50, 400);
        this.physics.add.collider(player, ground);
        
        let platforms = [];
        createPlatforms(this, LEVEL6_PLATFORMS, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level6.x, GOALS_CONFIG.level6.y);
        
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
        
        this.player = player;
        this.cursors = cursors;
    }

    update() {
        handlePlayerMovement(this.player, this.cursors, this);
    }
}
