// ==========================================
// BOOTSCENE - INICIALIZACIÓN
// ==========================================

import { createAssets } from '../assets/assetManager.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'boot' });
    }
    
    create() {
        // Crear todos los assets
        createAssets(this);
        
        // Ir al menú
        this.scene.start('menu');
    }
}
