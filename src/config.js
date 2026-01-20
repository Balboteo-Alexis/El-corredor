// ==========================================
// CONFIGURACIÓN PRINCIPAL DEL JUEGO
// ==========================================

const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        fullscreenTarget: 'game'
    },
    
    backgroundColor: '#0f0f1e',
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    
    render: {
        pixelArt: true,
        antialias: false
    },
    
    scene: [] // Se llenará desde main.js
};

export default gameConfig;

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
