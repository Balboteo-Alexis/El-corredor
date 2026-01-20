// ==========================================
// DATOS DE NIVELES - Configuración de dificultad
// ==========================================

export const LEVELS = [
    {
        key: 'level1',
        name: 'INICIO',
        description: 'Aprende los controles',
        platforms: [
            { x: 200, y: 600, width: 100, height: 20, type: 'normal' },
            { x: 450, y: 550, width: 100, height: 20, type: 'normal' },
            { x: 700, y: 500, width: 100, height: 20, type: 'normal' },
            { x: 950, y: 450, width: 100, height: 20, type: 'normal' }
        ],
        obstacles: [
            { x: 350, y: 480, width: 80, height: 300, type: 'wall' },
            { x: 800, y: 350, width: 80, height: 350, type: 'wall' }
        ],
        spikes: [],
        enemies: [],
        goal: { x: 1150, y: 380 },
        playerStart: { x: 100, y: 550 }
    },
    
    {
        key: 'level2',
        name: 'AUMENTO',
        description: 'Salta más rápido',
        platforms: [
            { x: 100, y: 600, width: 80, height: 20, type: 'normal' },
            { x: 250, y: 550, width: 80, height: 20, type: 'normal' },
            { x: 400, y: 480, width: 80, height: 20, type: 'normal' },
            { x: 550, y: 420, width: 80, height: 20, type: 'normal' },
            { x: 700, y: 350, width: 80, height: 20, type: 'normal' },
            { x: 850, y: 300, width: 80, height: 20, type: 'normal' },
            { x: 1000, y: 250, width: 80, height: 20, type: 'normal' }
        ],
        obstacles: [
            { x: 320, y: 400, width: 60, height: 300, type: 'wall' },
            { x: 650, y: 300, width: 60, height: 400, type: 'wall' }
        ],
        spikes: [
            { x: 180, y: 480 },
            { x: 480, y: 380 },
            { x: 750, y: 280 }
        ],
        enemies: [],
        goal: { x: 1150, y: 180 },
        playerStart: { x: 50, y: 600 }
    },
    
    {
        key: 'level3',
        name: 'DESAFÍO',
        description: 'Se mueven las plataformas',
        platforms: [
            { x: 100, y: 620, width: 60, height: 20, type: 'normal' },
            { x: 250, y: 570, width: 60, height: 20, type: 'moving', minX: 200, maxX: 350 },
            { x: 400, y: 500, width: 60, height: 20, type: 'normal' },
            { x: 550, y: 450, width: 60, height: 20, type: 'moving', minX: 450, maxX: 650 },
            { x: 700, y: 380, width: 60, height: 20, type: 'normal' },
            { x: 850, y: 320, width: 60, height: 20, type: 'moving', minX: 750, maxX: 950 },
            { x: 1000, y: 250, width: 60, height: 20, type: 'normal' }
        ],
        obstacles: [
            { x: 300, y: 350, width: 80, height: 380, type: 'wall' },
            { x: 750, y: 280, width: 80, height: 450, type: 'wall' },
            { x: 200, y: 380, width: 150, height: 40, type: 'wall' }
        ],
        spikes: [
            { x: 180, y: 520 },
            { x: 450, y: 430 },
            { x: 700, y: 330 },
            { x: 950, y: 220 }
        ],
        enemies: [
            { x: 600, y: 300, speed: 100 }
        ],
        goal: { x: 1150, y: 180 },
        playerStart: { x: 50, y: 620 }
    },
    
    {
        key: 'level4',
        name: 'LOCURA',
        description: 'Todo se mueve',
        platforms: [
            { x: 80, y: 640, width: 50, height: 20, type: 'normal' },
            { x: 200, y: 580, width: 50, height: 20, type: 'moving', minX: 150, maxX: 300 },
            { x: 320, y: 520, width: 50, height: 20, type: 'normal' },
            { x: 440, y: 460, width: 50, height: 20, type: 'moving', minX: 350, maxX: 550 },
            { x: 560, y: 400, width: 50, height: 20, type: 'normal' },
            { x: 680, y: 340, width: 50, height: 20, type: 'moving', minX: 600, maxX: 800 },
            { x: 800, y: 280, width: 50, height: 20, type: 'moving', minX: 700, maxX: 900 },
            { x: 920, y: 220, width: 50, height: 20, type: 'normal' },
            { x: 1040, y: 160, width: 50, height: 20, type: 'moving', minX: 950, maxX: 1150 }
        ],
        obstacles: [
            { x: 250, y: 350, width: 60, height: 400, type: 'wall' },
            { x: 600, y: 250, width: 60, height: 500, type: 'wall' },
            { x: 950, y: 380, width: 60, height: 370, type: 'wall' }
        ],
        spikes: [
            { x: 150, y: 500 }, { x: 280, y: 440 }, { x: 400, y: 360 },
            { x: 530, y: 280 }, { x: 680, y: 210 }, { x: 800, y: 140 },
            { x: 920, y: 80 }, { x: 1080, y: 30 }
        ],
        enemies: [
            { x: 300, y: 250, speed: 120 },
            { x: 750, y: 180, speed: 100 }
        ],
        goal: { x: 1200, y: 100 },
        playerStart: { x: 30, y: 640 }
    },
    
    {
        key: 'level5',
        name: 'EXTREMO',
        description: 'El límite',
        platforms: [
            { x: 50, y: 650, width: 40, height: 20, type: 'moving', minX: 30, maxX: 150 },
            { x: 150, y: 580, width: 40, height: 20, type: 'normal' },
            { x: 250, y: 520, width: 40, height: 20, type: 'moving', minX: 200, maxX: 350 },
            { x: 350, y: 460, width: 40, height: 20, type: 'normal' },
            { x: 450, y: 400, width: 40, height: 20, type: 'moving', minX: 400, maxX: 550 },
            { x: 550, y: 340, width: 40, height: 20, type: 'normal' },
            { x: 650, y: 280, width: 40, height: 20, type: 'moving', minX: 600, maxX: 750 },
            { x: 750, y: 220, width: 40, height: 20, type: 'normal' },
            { x: 850, y: 160, width: 40, height: 20, type: 'moving', minX: 800, maxX: 950 },
            { x: 950, y: 100, width: 40, height: 20, type: 'normal' },
            { x: 1050, y: 140, width: 40, height: 20, type: 'moving', minX: 1000, maxX: 1150 }
        ],
        obstacles: [
            { x: 180, y: 300, width: 50, height: 450, type: 'wall' },
            { x: 500, y: 200, width: 50, height: 550, type: 'wall' },
            { x: 850, y: 350, width: 50, height: 400, type: 'wall' }
        ],
        spikes: [
            { x: 100, y: 520 }, { x: 200, y: 430 }, { x: 300, y: 350 },
            { x: 400, y: 270 }, { x: 550, y: 220 }, { x: 700, y: 160 },
            { x: 850, y: 80 }, { x: 1000, y: 50 }, { x: 1100, y: 100 }
        ],
        enemies: [
            { x: 350, y: 200, speed: 150 },
            { x: 700, y: 150, speed: 130 },
            { x: 1000, y: 100, speed: 160 }
        ],
        goal: { x: 1200, y: 80 },
        playerStart: { x: 30, y: 650 }
    }
];

export function getLevelConfig(levelIndex) {
    return LEVELS[Math.min(levelIndex, LEVELS.length - 1)];
}
