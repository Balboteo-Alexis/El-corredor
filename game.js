import { MenuScene } from './Menu.js';
import { Level1 } from './levels/Level1.js';
import { Level2 } from './levels/Level2.js';
import { Level3 } from './levels/Level3.js';
import { Level4 } from './levels/Level4.js';
import { Level5 } from './levels/Level5.js';
import { Level6 } from './levels/Level6.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222222',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    },

    scene: [MenuScene, Level1, Level2, Level3, Level4, Level5, Level6]
};

const game = new Phaser.Game(config);
