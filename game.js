import { Level1 } from './Level1.js';
import { Level2 } from './Level2.js';
import { Level3 } from './Level3.js';
import { Level4 } from './Level4.js';
import { Level5 } from './Level5.js';
import { Level6 } from './Level6.js';

// ============ MENÚ ============
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        // Título
        this.add.text(400, 80, "EL CORREDOR", {
            fontSize: '72px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Espaciado vertical base
        const startY = 200;
        const spacing = 70;

        // Botón Nivel 1
        const btn1 = this.add.rectangle(400, startY + spacing * 0, 200, 60, 0x00ff00);
        this.add.text(400, startY + spacing * 0, "NIVEL 1", {
            fontSize: '32px',
            fill: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn1.setInteractive();
        btn1.on('pointerdown', () => this.scene.start('Level1'));

        // Botón Nivel 2
        const btn2 = this.add.rectangle(400, startY + spacing * 1, 200, 60, 0x0088ff);
        this.add.text(400, startY + spacing * 1, "NIVEL 2", {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn2.setInteractive();
        btn2.on('pointerdown', () => this.scene.start('Level2'));

        // Botón Nivel 3
        const btn3 = this.add.rectangle(400, startY + spacing * 2, 200, 60, 0xff00ff);
        this.add.text(400, startY + spacing * 2, "NIVEL 3", {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn3.setInteractive();
        btn3.on('pointerdown', () => this.scene.start('Level3'));

        // Botón Nivel 4
        const btn4 = this.add.rectangle(400, startY + spacing * 3, 200, 60, 0xffff00);
        this.add.text(400, startY + spacing * 3, "NIVEL 4", {
            fontSize: '32px',
            fill: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn4.setInteractive();
        btn4.on('pointerdown', () => this.scene.start('Level4'));

        // Botón Nivel 5
        const btn5 = this.add.rectangle(400, startY + spacing * 4, 200, 60, 0xff8800);
        this.add.text(400, startY + spacing * 4, "NIVEL 5", {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn5.setInteractive();
        btn5.on('pointerdown', () => this.scene.start('Level5'));

        // Botón Nivel 6
        const btn6 = this.add.rectangle(400, startY + spacing * 5, 200, 60, 0x00ff88);
        this.add.text(400, startY + spacing * 5, "NIVEL 6", {
            fontSize: '32px',
            fill: '#000000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        btn6.setInteractive();
        btn6.on('pointerdown', () => this.scene.start('Level6'));
    }
}

// ...Nivel 1 movido a Level1.js...

// ...Nivel 2 movido a Level2.js...

// ...Nivel 3 movido a Level3.js...
// ...Nivel 4 movido a Level4.js...

// ...Nivel 5 movido a Level5.js...

// ...Nivel 6 movido a Level6.js...

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

    scene: [MenuScene, Level1, Level2, Level3, Level4, Level5, Level6]
};

const game = new Phaser.Game(config);

<script type="module" src="game.js"></script>
