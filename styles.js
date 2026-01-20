// ============ ESTILOS Y ASSETS GLOBALES ============

export const COLORS = {
    player: 0xff4444,
    ground: 0x2d5016,
    obstacle: 0x8b4513,
    goal: 0xffd700,
    platform1: 0x00dddd,
    platform2: 0xff6600,
    platform3: 0x00ff99,
    platform4: 0xff1493,
    platform5: 0x00ffff,
    bg: 0x1a1a2e,
    accent: 0xf39c12
};

export const SIZES = {
    playerWidth: 40,
    playerHeight: 60,
    goalWidth: 40,
    goalHeight: 80
};

// Crear textura del jugador mejorada
export function createPlayerTexture(scene) {
    if (scene.textures.exists('player_texture')) {
        return;
    }
    
    let graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    
    // Cuerpo
    graphics.fillStyle(COLORS.player, 1);
    graphics.fillCircle(20, 10, 8);
    graphics.fillRect(16, 18, 8, 20);
    
    // Brazos
    graphics.lineStyle(3, COLORS.player);
    graphics.lineBetween(16, 22, 8, 20);
    graphics.lineBetween(24, 22, 32, 20);
    
    // Piernas
    graphics.lineBetween(18, 38, 14, 58);
    graphics.lineBetween(22, 38, 26, 58);
    
    // Ojos
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(18, 8, 1.5);
    graphics.fillCircle(22, 8, 1.5);
    
    graphics.generateTexture('player_texture', 40, 60);
    graphics.destroy();
}

// Crear textura de la meta (Estrella con efecto 3D)
export function createGoalTexture(scene) {
    if (scene.textures.exists('goal_texture')) {
        return;
    }
    
    let goalGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    
    // Sombra
    goalGraphics.fillStyle(0x000000, 0.3);
    goalGraphics.fillCircle(40, 42, 38);
    
    // Estrella dorada
    goalGraphics.fillStyle(COLORS.goal, 1);
    
    const centerX = 40, centerY = 40;
    const outerRadius = 35;
    const innerRadius = 15;
    
    const points = [];
    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        points.push({ 
            x: centerX + radius * Math.cos(angle), 
            y: centerY + radius * Math.sin(angle) 
        });
    }
    
    goalGraphics.beginPath();
    goalGraphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        goalGraphics.lineTo(points[i].x, points[i].y);
    }
    goalGraphics.lineTo(points[0].x, points[0].y);
    goalGraphics.fillPath();
    
    // Borde
    goalGraphics.lineStyle(2, 0xffed4e);
    goalGraphics.beginPath();
    goalGraphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        goalGraphics.lineTo(points[i].x, points[i].y);
    }
    goalGraphics.lineTo(points[0].x, points[0].y);
    goalGraphics.strokePath();
    
    goalGraphics.generateTexture('goal_texture', 80, 80);
    goalGraphics.destroy();
}

// Crear el jugador
export function createPlayer(scene, x, y) {
    createPlayerTexture(scene);
    let player = scene.add.sprite(x, y, 'player_texture');
    scene.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    player.body.setSize(SIZES.playerWidth, SIZES.playerHeight);
    return player;
}

// Crear el suelo
export function createGround(scene) {
    let ground = scene.add.rectangle(400, 600 - 20, 800, 40, COLORS.ground);
    scene.physics.add.existing(ground, true);
    return ground;
}

// Crear un obstáculo
export function createObstacle(scene, x, y, width, height, color = COLORS.obstacle) {
    let obstacle = scene.add.rectangle(x, y, width, height, color);
    scene.physics.add.existing(obstacle, true);
    return obstacle;
}

// Crear una plataforma
export function createPlatform(scene, x, y, width, height, color) {
    let platform = scene.add.rectangle(x, y, width, height, color);
    scene.physics.add.existing(platform, true);
    return platform;
}

// Crear la meta
export function createGoal(scene, x, y) {
    createGoalTexture(scene);
    let goal = scene.add.sprite(x, y, 'goal_texture');
    scene.physics.add.existing(goal, true);
    goal.body.setSize(SIZES.goalWidth, SIZES.goalHeight);
    goal.body.setOffset(0, 0);
    return goal;
}

// Manejar movimiento del jugador con animaciones
export function handlePlayerMovement(player, cursors, scene) {
    if (cursors.left.isDown) {
        player.body.setVelocityX(-250);
        player.setFlipX(true);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(250);
        player.setFlipX(false);
    } else {
        player.body.setVelocityX(0);
    }
    
    const isJumping = !player.body.blocked.down;
    
    if ((Phaser.Input.Keyboard.JustDown(cursors.up) ||
         Phaser.Input.Keyboard.JustDown(cursors.space)) &&
        player.body.blocked.down) {
        player.body.setVelocityY(-550);
        // Efecto visual de salto
        if (scene && scene.tweens) {
            scene.tweens.add({
                targets: player,
                scaleY: 0.8,
                duration: 100,
                yoyo: true
            });
        }
    }
    
    // Escala según si está en el aire
    if (isJumping && !player.wasJumping) {
        if (scene && scene.tweens) {
            scene.tweens.add({
                targets: player,
                scaleX: 0.9,
                scaleY: 1.1,
                duration: 150
            });
        }
    } else if (!isJumping && player.wasJumping) {
        if (scene && scene.tweens) {
            scene.tweens.add({
                targets: player,
                scaleX: 1,
                scaleY: 1,
                duration: 150
            });
        }
    }
    
    player.wasJumping = isJumping;
}

// Crear meta completa con overlay de victoria
export function setupGoalWithMessage(scene, player, goalX, goalY) {
    let goal = createGoal(scene, goalX, goalY);
    
    let message = scene.add.text(400, 100, "¡META ALCANZADA!", {
        fontSize: '64px',
        fill: '#ffff00',
        fontStyle: 'bold',
        align: 'center'
    });
    message.setOrigin(0.5, 0);
    message.setVisible(false);
    
    scene.physics.add.overlap(player, goal, () => {
        goal.setTint(0xffffff);
        message.setVisible(true);
        scene.time.delayedCall(2000, () => {
            scene.scene.restart();
        });
    });
    
    return { goal, message };
}