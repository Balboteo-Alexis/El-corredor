// ==========================================
// LEVELSCENE - ESCENA PRINCIPAL DE JUEGO
// ==========================================

import { getLevelConfig } from '../assets/levels.js';
import { Player, Enemy, MovingPlatform } from '../utils/GameObjects.js';
import { createAssets } from '../assets/assetManager.js';

export default class LevelScene extends Phaser.Scene {
    constructor(levelNumber = 1) {
        super({ key: `level${levelNumber}` });
        this.levelNumber = levelNumber;
        this.levelConfig = null;
        this.player = null;
        this.enemies = [];
        this.movingPlatforms = [];
        this.isDone = false;
    }
    
    preload() {
        // Los assets ya están creados en create
    }
    
    create() {
        const { COLORS } = createAssets(this);
        this.COLORS = COLORS;
        
        // Cargar configuración del nivel
        this.levelConfig = getLevelConfig(this.levelNumber);
        
        // Fondo degradado
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillGradientStyle(COLORS.bgTop, COLORS.bgTop, COLORS.bgBottom, COLORS.bgBottom, 1);
        graphics.fillRect(0, 0, 1280, 720);
        graphics.generateTexture(`bg${this.levelNumber}`, 1280, 720);
        graphics.destroy();
        this.add.image(640, 360, `bg${this.levelNumber}`).setScrollFactor(0);
        
        // UI - Nivel
        const levelText = this.add.text(50, 30, `LEVEL ${this.levelNumber}`, {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });
        levelText.setScrollFactor(0);
        
        // UI - Timer
        this.timer = this.add.text(1230, 30, '0:00', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'right'
        }).setOrigin(1, 0);
        this.timer.setScrollFactor(0);
        this.elapsedTime = 0;
        
        // Crear jugador
        const playerStart = this.levelConfig.playerStart;
        this.player = new Player(this, playerStart.x, playerStart.y);
        this.player.setScale(1.2);
        
        // Crear plataformas normales
        this.platforms = this.physics.add.staticGroup();
        this.levelConfig.platforms.forEach(p => {
            if (p.type === 'normal') {
                const platform = this.add.sprite(p.x, p.y, 'platform_normal');
                platform.setDisplaySize(p.width, p.height);
                this.physics.add.existing(platform, true);
                this.platforms.add(platform);
            }
        });
        
        // Crear plataformas móviles
        this.levelConfig.platforms.forEach(p => {
            if (p.type === 'moving') {
                const movingPlatform = new MovingPlatform(
                    this, p.x, p.y,
                    p.minX || p.x - 100,
                    p.maxX || p.x + 100
                );
                movingPlatform.setDisplaySize(p.width, p.height);
                this.movingPlatforms.push(movingPlatform);
                this.platforms.add(movingPlatform);
            }
        });
        
        // Crear obstáculos (muros)
        this.obstacles = this.physics.add.staticGroup();
        this.levelConfig.obstacles.forEach(obs => {
            if (obs.type === 'wall') {
                const wall = this.add.rectangle(obs.x, obs.y, obs.width, obs.height, COLORS.wall);
                this.physics.add.existing(wall, true);
                this.obstacles.add(wall);
            }
        });
        
        // Crear pinchos
        this.spikes = this.physics.add.staticGroup();
        this.levelConfig.spikes.forEach(spike => {
            const spikeSprite = this.add.sprite(spike.x, spike.y, 'spike');
            spikeSprite.setScale(1.5);
            this.physics.add.existing(spikeSprite, true);
            this.spikes.add(spikeSprite);
        });
        
        // Crear enemigos
        this.levelConfig.enemies.forEach(enemy => {
            const newEnemy = new Enemy(this, enemy.x, enemy.y, enemy.speed || 80);
            newEnemy.setScale(1.2);
            this.enemies.push(newEnemy);
        });
        
        // Crear meta (goal)
        const goalPos = this.levelConfig.goal;
        this.goal = this.add.sprite(goalPos.x, goalPos.y, 'goal');
        this.goal.setScale(1.3);
        this.physics.add.existing(this.goal);
        this.goal.body.setAllowGravity(false);
        this.goal.body.moves = false;
        
        // Efecto de rotación en la meta
        this.tweens.add({
            targets: this.goal,
            rotation: Phaser.Math.PI2,
            duration: 3000,
            repeat: -1
        });
        
        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        
        // Colisiones
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.obstacles);
        
        // Pinchos = muerte
        this.physics.add.overlap(this.player, this.spikes, () => {
            this.playerDie();
        });
        
        // Enemigos = muerte
        this.physics.add.overlap(this.player, this.enemies, () => {
            this.playerDie();
        });
        
        // Meta = ganar
        this.physics.add.overlap(this.player, this.goal, () => {
            this.levelWin();
        });
        
        // Límites del mundo
        this.physics.world.setBounds(0, 0, 1280, 1000);
        this.cameras.main.setBounds(0, 0, 1280, 1000);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setLerp(0.1, 0.1);
        
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.isDone) {
                    this.elapsedTime++;
                    const mins = Math.floor(this.elapsedTime / 60);
                    const secs = this.elapsedTime % 60;
                    this.timer.setText(`${mins}:${secs.toString().padStart(2, '0')}`);
                }
            },
            loop: true
        });
    }
    
    update() {
        if (this.isDone) return;
        
        if (this.player) {
            this.player.update(this.cursors, this);
        }
        
        // Actualizar plataformas móviles
        this.movingPlatforms.forEach(p => p.update());
        
        // Actualizar enemigos
        this.enemies.forEach(e => e.update());
        
        // Caer del mundo
        if (this.player.y > 1000) {
            this.playerDie();
        }
    }
    
    playerDie() {
        if (this.isDone) return;
        
        this.player.die();
        
        this.time.delayedCall(500, () => {
            this.cameras.main.shake(200, 0.01);
        });
        
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        });
    }
    
    levelWin() {
        if (this.isDone) return;
        this.isDone = true;
        
        this.player.setTint(0x00ff00);
        
        const text = this.add.text(640, 360, '¡GANASTE!', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            fill: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        
        const timeText = this.add.text(640, 450, `Tiempo: ${Math.floor(this.elapsedTime / 60)}:${(this.elapsedTime % 60).toString().padStart(2, '0')}`, {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0);
        
        const nextLevel = this.levelNumber < 5;
        const nextText = this.add.text(640, 520, nextLevel ? 'Presiona ESPACIO para el siguiente nivel' : 'Presiona ESPACIO para volver al menú', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 1
        }).setOrigin(0.5).setScrollFactor(0);
        
        this.input.keyboard.on('keydown-SPACE', () => {
            if (nextLevel) {
                this.scene.start(`level${this.levelNumber + 1}`);
            } else {
                this.scene.start('menu');
            }
        });
    }
}
