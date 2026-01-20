// ============ MENÚ ============
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        // Fondo con gradiente
        this.cameras.main.setBackgroundColor('#0f0f23');
        
        // Título animado
        const title = this.add.text(400, 60, "EL CORREDOR", {
            fontSize: '72px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Efecto de rotación continua del título
        this.tweens.add({
            targets: title,
            y: 80,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inout'
        });
        
        // Subtítulo
        this.add.text(400, 120, "Plataformas y Acción", {
            fontSize: '20px',
            fill: '#ff6600',
            align: 'center',
            italic: true
        }).setOrigin(0.5);

        // Espaciado vertical base
        const startY = 200;
        const spacing = 65;
        const levels = [
            { text: "NIVEL 1", scene: 'Level1', color: 0x00ff00, textColor: '#000000' },
            { text: "NIVEL 2", scene: 'Level2', color: 0x0088ff, textColor: '#ffffff' },
            { text: "NIVEL 3", scene: 'Level3', color: 0xff00ff, textColor: '#ffffff' },
            { text: "NIVEL 4", scene: 'Level4', color: 0xffff00, textColor: '#000000' },
            { text: "NIVEL 5", scene: 'Level5', color: 0xff8800, textColor: '#ffffff' },
            { text: "NIVEL 6", scene: 'Level6', color: 0x00ff88, textColor: '#000000' }
        ];

        levels.forEach((level, index) => {
            const btn = this.add.rectangle(400, startY + spacing * index, 200, 60, level.color);
            btn.setDepth(1);
            
            const btnText = this.add.text(400, startY + spacing * index, level.text, {
                fontSize: '28px',
                fill: level.textColor,
                fontStyle: 'bold',
                align: 'center'
            }).setOrigin(0.5);
            btnText.setDepth(2);
            
            btn.setInteractive({ useHandCursor: true });
            
            // Efecto hover
            btn.on('pointerover', () => {
                this.tweens.add({
                    targets: btn,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 200,
                    ease: 'Power2'
                });
                this.tweens.add({
                    targets: btnText,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 200,
                    ease: 'Power2'
                });
            });
            
            btn.on('pointerout', () => {
                this.tweens.add({
                    targets: btn,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200,
                    ease: 'Power2'
                });
                this.tweens.add({
                    targets: btnText,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200,
                    ease: 'Power2'
                });
            });
            
            btn.on('pointerdown', () => {
                // Efecto de presión
                this.tweens.add({
                    targets: [btn, btnText],
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.scene.start(level.scene);
                    }
                });
            });
        });
    }
}
