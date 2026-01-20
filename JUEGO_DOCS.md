# 🎮 RUNNER SQUAD - Juego de Plataformas Profesional

## 📋 Descripción

**RUNNER SQUAD** es un juego de plataformas completamente rediseñado y mejorado, con:

✅ **Pantalla Completa** - Modo fullscreen con escala adaptativa
✅ **5 Niveles Progresivos** - Dificultad creciente desde tutorial hasta experto
✅ **Gráficos Profesionales** - Sprites procedurales con animaciones suaves
✅ **Física Realista** - Sistema de gravedad y colisiones mejorado
✅ **Controles Intuitivos** - Arrows/WASD + Space/W para saltar
✅ **Sistema de Enemies** - IA con patrullas de movimiento
✅ **Plataformas Móviles** - Obstáculos dinámicos en niveles avanzados
✅ **Efectos Visuales** - Animaciones, tweens y feedback visual

---

## 🎮 Controles

| Acción | Controles |
|--------|-----------|
| Mover Izquierda | ← o A |
| Mover Derecha | → o D |
| Saltar | ESPACIO o W |

---

## 📊 Progresión de Niveles

### Level 1: INICIO (Tutorial)
- 4 plataformas horizontales
- 2 muros obstáculos
- Dificultad: ⭐ Muy Fácil
- Objetivo: Aprender los controles

### Level 2: AUMENTO
- 7 plataformas (patrón vertical)
- 3 púas hazard
- 1 muro
- Dificultad: ⭐⭐ Fácil

### Level 3: DESAFÍO
- 9 plataformas (3 móviles)
- 4 púas
- 1 enemigo patrulle
- Dificultad: ⭐⭐⭐ Medio

### Level 4: LOCURA
- 10 plataformas (5 móviles)
- 3 muros
- 8 púas
- 2 enemigos
- Dificultad: ⭐⭐⭐⭐ Difícil

### Level 5: EXTREMO
- 11 plataformas (6 móviles)
- 9 púas
- 3 enemigos
- Laberinto complejo
- Dificultad: ⭐⭐⭐⭐⭐ Muy Difícil

---

## 🏗️ Estructura del Proyecto

```
El corredor/
├── main.js                          # Punto de entrada
├── index.html                       # HTML principal
├── README.md                        # Este archivo
│
├── src/
│   ├── config.js                    # Configuración de Phaser
│   │
│   ├── scenes/
│   │   ├── BootScene.js             # Inicialización de assets
│   │   ├── MenuScene.js             # Menú principal
│   │   └── LevelScene.js            # Lógica de juego principal
│   │
│   ├── assets/
│   │   ├── assetManager.js          # Generación de sprites
│   │   ├── levels.js                # Configuración de niveles
│   │   └── COLORS.js                # Paleta de colores
│   │
│   └── utils/
│       └── GameObjects.js           # Clases Player, Enemy, MovingPlatform
│
└── [Archivos antiguos - no se usan en esta versión]
    ├── game.js
    ├── Menu.js
    ├── styles.js
    └── ...
```

---

## 🎨 Sistema de Assets

Todos los sprites se generan **proceduralmente** usando la API de Phaser.Graphics:

- **Player**: Personaje rojo con ojos y extremidades animadas
- **Goal**: Estrella dorada giratoria (meta del nivel)
- **Spike**: Púas triangulares rojas peligrosas
- **Enemy**: Enemigo rosa con dientes que patrulla
- **Platforms**: Plataformas verdes normales y naranjas móviles

### Paleta de Colores

```javascript
{
  player: 0xff4444        // Rojo jugador
  goal: 0xffd700          // Oro estrella
  spike: 0xff3333         // Rojo puro púas
  enemy: 0xff1493         // Rosa enemigo
  platform: 0x4a9d6f      // Verde plataformas
  movingPlatform: 0xff9800 // Naranja plataformas móviles
}
```

---

## ⚙️ Configuración Técnica

### Phaser 3 Configuration

```javascript
{
  resolution: 1280x720    // 16:9 Full HD
  scaleMode: FIT          // Adaptable a cualquier pantalla
  fullscreen: Enabled     // Modo pantalla completa disponible
  physics: Arcade         // Physics engine
  gravity: 1500           // Gravedad fuerte
  pixelArt: true          // Renderizado pixel art
}
```

### Física del Juego

- **Gravedad**: 1500 (fuerte, caídas rápidas)
- **Velocidad del Jugador**: 300 px/s
- **Fuerza de Salto**: 600 (permite saltos altos)
- **Velocidad Enemigos**: 80-150 px/s

---

## 🎯 Mecánicas Principales

### Colisiones

```
✓ Jugador + Plataformas = Saltar
✓ Jugador + Enemigos = Muerte
✓ Jugador + Púas = Muerte
✓ Jugador + Meta = GANAR NIVEL
✓ Jugador + Límites mundo = Muerte
```

### Movimiento de Plataformas

- Se mueven horizontalmente en un rango definido
- Velocidad: 100 px/s
- El jugador se mueve CON la plataforma

### IA de Enemigos

- Patrullan en un rango definido (±200 px)
- Cambian dirección al alcanzar límites
- Movimiento suave y predecible

---

## 🚀 Cómo Ejecutar

1. Abre `index.html` en el navegador (necesita servidor local)
2. Si usas VS Code, instala "Live Server" extension
3. Click derecho en `index.html` → "Open with Live Server"
4. El juego se abre en `http://localhost:5500`

### Requerimientos

- Navegador moderno (Chrome, Firefox, Edge)
- Phaser 3 (cargado via CDN)
- Conexión a internet (para CDN)

---

## 🎨 Mejoras Visuales Implementadas

✨ **Animaciones Suaves**
- Tweens para saltos y caídas
- Rotación de la meta
- Efectos de escala en colisiones

🎨 **Diseño Profesional**
- Gradientes de fondo
- Paleta de colores coherente
- UI clara y legible

🎯 **Feedback Visual**
- Cambio de color al ganar/perder
- Efectos de shake en cámara
- Contador de tiempo en tiempo real

---

## 📈 Desarrollo Futuro

Posibles mejoras:

- [ ] Sistema de sonido y música
- [ ] Particles effects (explosiones, chispas)
- [ ] Leaderboard de tiempos
- [ ] Tutorial interactivo
- [ ] Modo modo infinito
- [ ] Skins personalizables
- [ ] Power-ups (inmunidad, velocidad)
- [ ] Mobile controls (touchscreen)

---

## 🐛 Troubleshooting

### El juego no carga
→ Verifica que Phaser esté cargado (revisar console del navegador)

### Los sprites no aparecen
→ Asegúrate que createAssets() se llama en BootScene

### Física extraña
→ Revisa que la gravedad sea 1500 en config.js

### Performance bajo
→ Desactiva debug en physics.arcade.debug = false

---

## 👨‍💻 Autor

Creado con ❤️ usando **Phaser 3**

**Versión**: 1.0 - Professional Edition
**Última actualización**: 2024

---

**¡Disfruta el juego!** 🎮🎉
