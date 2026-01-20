import { createPlayer, createGround, handlePlayerMovement, setupGoalWithMessage } from '../styles.js';
import { createObstacles, LEVEL1_OBSTACLES, GOALS_CONFIG } from '../obstacles.js';

export class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }

    create() {
        // Fondo mejorado
        this.cameras.main.setBackgroundColor('#1a1a2e');
        
        let cursors = this.input.keyboard.createCursorKeys();
        
        // Usar funciones del archivo de estilos
        let ground = createGround(this);
        let player = createPlayer(this, 30, 300);
        this.physics.add.collider(player, ground);
        
        // Crear obstáculos usando configuración
        createObstacles(this, LEVEL1_OBSTACLES, player);
        
        // Crear meta con overlay
        const { goal, message } = setupGoalWithMessage(this, player, GOALS_CONFIG.level1.x, GOALS_CONFIG.level1.y);
        
        // Animar meta con rotación
        this.tweens.add({
            targets: goal,
            rotation: Math.PI * 2,
            duration: 3000,
            repeat: -1,
            ease: 'Linear'
        });
        
        // Título del nivel
        this.add.text(400, 20, "NIVEL 1 - INICIO", {
            fontSize: '20px',
            fill: '#00ff00',
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
