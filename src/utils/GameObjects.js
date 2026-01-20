// ==========================================
// UTILIDADES DE GAMEPLAY
// ==========================================

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setDrag(0);
        
        this.speed = 300;
        this.jumpPower = 600;
        this.wasJumping = false;
        this.canJump = false;
        
        this.isDead = false;
    }
    
    update(cursors, scene) {
        if (this.isDead) return;
        
        // Movimiento horizontal
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }
        
        // Salto
        const isJumping = this.body.velocity.y < 0;
        
        if ((Phaser.Input.Keyboard.JustDown(cursors.up) ||
             Phaser.Input.Keyboard.JustDown(cursors.space)) &&
            this.body.blocked.down) {
            this.setVelocityY(-this.jumpPower);
            
            // Efecto visual
            if (scene && scene.tweens) {
                scene.tweens.add({
                    targets: this,
                    scaleY: 0.8,
                    duration: 100,
                    yoyo: true
                });
            }
        }
        
        // Animación de escala
        if (isJumping && !this.wasJumping) {
            if (scene && scene.tweens) {
                scene.tweens.add({
                    targets: this,
                    scaleX: 0.9,
                    scaleY: 1.1,
                    duration: 150
                });
            }
        } else if (!isJumping && this.wasJumping) {
            if (scene && scene.tweens) {
                scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150
                });
            }
        }
        
        this.wasJumping = isJumping;
    }
    
    die() {
        this.isDead = true;
        this.setTint(0xff0000);
    }
    
    reset(x, y) {
        this.setPosition(x, y);
        this.setVelocity(0, 0);
        this.isDead = false;
        this.setTint(0xffffff);
    }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.speed = speed || 100;
        this.direction = 1;
        this.minX = x - 200;
        this.maxX = x + 200;
    }
    
    update() {
        this.setVelocityX(this.speed * this.direction);
        
        if (this.x <= this.minX || this.x >= this.maxX) {
            this.direction *= -1;
            this.setFlipX(this.direction < 0);
        }
    }
}

export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, minX, maxX) {
        super(scene, x, y, 'platform_moving');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        
        this.startX = x;
        this.minX = minX;
        this.maxX = maxX;
        this.speed = 100;
        this.direction = 1;
    }
    
    update() {
        this.x += this.speed * this.direction * (1 / 60); // 60 FPS
        
        if (this.x <= this.minX) {
            this.x = this.minX;
            this.direction = 1;
        } else if (this.x >= this.maxX) {
            this.x = this.maxX;
            this.direction = -1;
        }
    }
}
