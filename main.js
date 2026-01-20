// ==========================================
// MAIN.JS - PUNTO DE ENTRADA DEL JUEGO
// ==========================================

import gameConfig from './src/config.js';
import BootScene from './src/scenes/BootScene.js';
import MenuScene from './src/scenes/MenuScene.js';
import LevelScene from './src/scenes/LevelScene.js';

// Agregar todas las escenas a la configuración
gameConfig.scene = [
    BootScene,
    MenuScene,
];

// Crear instancias de cada nivel
for (let i = 1; i <= 5; i++) {
    gameConfig.scene.push(
        new LevelScene(i)
    );
}

// Crear el juego
const game = new Phaser.Game(gameConfig);
