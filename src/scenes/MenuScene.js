// ==========================================
// MENUSCENE - MENÚ PRINCIPAL
// ==========================================

import { createAssets } from '../assets/assetManager.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    
    create() {
        const { COLORS } = createAssets(this);
        
        // Fondo
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x16213e, 0x16213e, 1);
        graphics.fillRect(0, 0, 1280, 720);
        graphics.generateTexture('menuBg', 1280, 720);
        graphics.destroy();
        this.add.image(640, 360, 'menuBg').setScrollFactor(0);
        
        // Título
        this.add.text(640, 120, 'RUNNER SQUAD', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            fill: '#ff00ff',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(640, 200, 'El desafío de plataformas extremo', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#00ffff',
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0.5);
        
        // Selección de nivel
        const levelCount = 5;
        const buttonWidth = 120;
        const buttonHeight = 80;
        const spacing = 40;
        const totalWidth = (levelCount * buttonWidth) + ((levelCount - 1) * spacing);
        const startX = (1280 - totalWidth) / 2;
        
        for (let i = 1; i <= levelCount; i++) {
            this.createLevelButton(
                startX + (i - 1) * (buttonWidth + spacing) + buttonWidth / 2,
                380,
                i,
                COLORS
            );
        }
        
        // Instrucciones
        this.add.text(640, 550, 'CONTROLES', {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            fill: '#ffff00'
        }).setOrigin(0.5);
        
        this.add.text(640, 600, 'FLECHAS/ASWD para movimiento | ESPACIO/W para saltar', {
            fontSize: '16px',
            fontFamily: 'Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        this.add.text(640, 630, 'Alcanza la ESTRELLA para terminar cada nivel', {
            fontSize: '16px',
            fontFamily: 'Arial',
            fill: '#ff9900'
        }).setOrigin(0.5);
        
        // Versión
        this.add.text(20, 680, 'v1.0 - Professional Edition', {
            fontSize: '12px',
            fontFamily: 'Arial',
            fill: '#888888'
        });
    }
    
    createLevelButton(x, y, levelNumber, COLORS) {
        const button = this.add.rectangle(x, y, 120, 80, COLORS.levelButton);
        button.setInteractive({ useHandCursor: true });
        
        const text = this.add.text(x, y, `LEVEL\n${levelNumber}`, {
            fontSize: '20px',
            fontFamily: 'Arial Black',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);
        
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200
            });
            button.setFillStyle(COLORS.levelButtonHover);
        });
        
        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
            button.setFillStyle(COLORS.levelButton);
        });
        
        button.on('pointerdown', () => {
            this.tweens.add({
                targets: [button, text],
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 100
            });
        });
        
        button.on('pointerup', () => {
            this.tweens.add({
                targets: [button, text],
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100
            });
            
            this.time.delayedCall(100, () => {
                this.scene.start(`level${levelNumber}`);
            });
        });
    }
}
