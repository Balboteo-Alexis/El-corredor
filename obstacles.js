// ============ OBSTÁCULOS RECURRENTES ============

import { COLORS } from './styles.js';

// Crear un obstáculo simple rectangular
export function createRectangleObstacle(scene, x, y, width, height, color = COLORS.obstacle) {
    let obstacle = scene.add.rectangle(x, y, width, height, color);
    scene.physics.add.existing(obstacle, true);
    return obstacle;
}

// Crear múltiples obstáculos de una vez
export function createObstacles(scene, obstacleConfig, player) {
    const obstacles = [];
    
    obstacleConfig.forEach(config => {
        let obstacle = createRectangleObstacle(scene, config.x, config.y, config.width, config.height, config.color);
        obstacles.push(obstacle);
        scene.physics.add.collider(player, obstacle);
    });
    
    return obstacles;
}

// Configuración de obstáculos Level 1
export const LEVEL1_OBSTACLES = [
    { x: 500, y: 200, width: 200, height: 420, color: COLORS.obstacle },
    { x: 500, y: 530, width: 150, height: 60, color: COLORS.obstacle },
    { x: 0, y: 530, width: 150, height: 60, color: COLORS.obstacle }
];

// Crear plataformas (más fáciles que obstáculos)
export function createPlatforms(scene, platformConfig, player) {
    const platforms = [];
    
    platformConfig.forEach(config => {
        let platform = scene.add.rectangle(config.x, config.y, config.width, config.height, config.color);
        scene.physics.add.existing(platform, true);
        platforms.push(platform);
        scene.physics.add.collider(player, platform);
    });
    
    return platforms;
}

// Configuración de plataformas Level 6
export const LEVEL6_PLATFORMS = [
    { x: 200, y: 500, width: 100, height: 20, color: 0x00ffcc },
    { x: 350, y: 420, width: 80, height: 20, color: 0xffcc00 },
    { x: 500, y: 350, width: 80, height: 20, color: 0x00ccff },
    { x: 650, y: 280, width: 100, height: 20, color: 0xff00cc },
    { x: 770, y: 200, width: 60, height: 20, color: 0x00ff88 }
];

// Configuración de metas por nivel
export const GOALS_CONFIG = {
    level1: { x: 770, y: 520 },
    level2: { x: 770, y: 520 },
    level3: { x: 770, y: 520 },
    level4: { x: 770, y: 520 },
    level5: { x: 770, y: 520 },
    level6: { x: 770, y: 150 }
};
