// ==========================================
// SISTEMA DE ASSETS - Texturas y diseños
// ==========================================

export const COLORS = {
    // Jugador
    player: 0xff4444,
    playerEyes: 0xffffff,
    
    // Elementos del nivel
    ground: 0x2d5016,
    platform: 0x4a9d6f,
    spike: 0xff3333,
    movingPlatform: 0xff9800,
    goal: 0xffd700,
    wall: 0x8b4513,
    
    // Enemigos
    enemy: 0xff1493,
    
    // Fondos
    bgTop: 0x1a1a2e,
    bgBottom: 0x16213e,
    
    // UI
    bg: 0x0f0f1e,
    uiBg: 0x1a1a2e,
    uiAccent: 0xf39c12,
    textPrimary: 0xffffff,
    textSuccess: 0x00ff99,
    textWarning: 0xff6600,
    levelButton: 0x667eea,
    levelButtonHover: 0x764ba2
};

// Crear texturas de sprites
export function createAssets(scene) {
    createPlayerTexture(scene);
    createGoalTexture(scene);
    createSpikeTexture(scene);
    createEnemyTexture(scene);
    createPlatformTextures(scene);
    
    return { COLORS };
}

// Jugador con detalles
function createPlayerTexture(scene) {
    if (scene.textures.exists('player')) return;
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(COLORS.player, 1);
    
    // Cuerpo redondeado
    graphics.fillRect(15, 15, 20, 25);
    graphics.fillCircle(25, 15, 10);
    
    // Ojos
    graphics.fillStyle(COLORS.playerEyes, 1);
    graphics.fillCircle(20, 12, 2);
    graphics.fillCircle(30, 12, 2);
    
    // Brazos
    graphics.fillStyle(COLORS.player, 1);
    graphics.fillRect(10, 20, 5, 15);
    graphics.fillRect(35, 20, 5, 15);
    
    // Piernas
    graphics.fillRect(17, 40, 4, 15);
    graphics.fillRect(28, 40, 4, 15);
    
    graphics.generateTexture('player', 50, 55);
    graphics.destroy();
}

// Meta con estilo
function createGoalTexture(scene) {
    if (scene.textures.exists('goal')) return;
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    
    // Sombra
    graphics.fillStyle(0x000000, 0.2);
    graphics.fillCircle(40, 42, 38);
    
    // Estrella dorada con gradiente simulado
    graphics.fillStyle(COLORS.goal, 1);
    const centerX = 40, centerY = 40;
    const outerRadius = 35, innerRadius = 14;
    
    const points = [];
    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        });
    }
    
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    points.forEach((p, i) => {
        if (i > 0) graphics.lineTo(p.x, p.y);
    });
    graphics.lineTo(points[0].x, points[0].y);
    graphics.fillPath();
    
    // Borde brillante
    graphics.lineStyle(3, 0xffed4e);
    graphics.strokePath();
    
    graphics.generateTexture('goal', 80, 80);
    graphics.destroy();
}

// Púas peligrosas
function createSpikeTexture(scene) {
    if (scene.textures.exists('spike')) return;
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(COLORS.spike, 1);
    
    // Triángulo
    graphics.beginPath();
    graphics.moveTo(25, 10);
    graphics.lineTo(50, 40);
    graphics.lineTo(0, 40);
    graphics.closePath();
    graphics.fillPath();
    
    graphics.generateTexture('spike', 50, 45);
    graphics.destroy();
}

// Enemigo
function createEnemyTexture(scene) {
    if (scene.textures.exists('enemy')) return;
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(COLORS.enemy, 1);
    
    // Cuerpo cuadrado
    graphics.fillRect(10, 15, 30, 25);
    
    // Ojos
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(18, 22, 3);
    graphics.fillCircle(32, 22, 3);
    
    // Dientes
    graphics.fillStyle(COLORS.enemy, 1);
    graphics.fillRect(16, 30, 3, 5);
    graphics.fillRect(24, 30, 3, 5);
    graphics.fillRect(32, 30, 3, 5);
    
    graphics.generateTexture('enemy', 50, 45);
    graphics.destroy();
}

// Plataformas especiales
function createPlatformTextures(scene) {
    if (!scene.textures.exists('platform_normal')) {
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(COLORS.platform, 1);
        graphics.fillRect(0, 0, 100, 20);
        graphics.lineStyle(2, 0x2d5016);
        graphics.strokeRect(0, 0, 100, 20);
        graphics.generateTexture('platform_normal', 100, 20);
        graphics.destroy();
    }
    
    if (!scene.textures.exists('platform_moving')) {
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(COLORS.movingPlatform, 1);
        graphics.fillRect(0, 0, 80, 20);
        graphics.lineStyle(2, 0xcc6600);
        graphics.strokeRect(0, 0, 80, 20);
        // Patrón
        for (let i = 10; i < 80; i += 20) {
            graphics.strokeRect(i - 5, 5, 10, 10);
        }
        graphics.generateTexture('platform_moving', 80, 20);
        graphics.destroy();
    }
}
