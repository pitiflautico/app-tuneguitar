# 👀 Vista Previa Visual de la Aplicación

Como la app está construida pero necesita un emulador para ejecutarse, aquí está una descripción visual de lo que verás:

## 🎨 Pantallas de la Aplicación

### 1. 📱 Onboarding (Primera vez)
```
┌─────────────────────────┐
│    Select Instrument    │
│                         │
│  ┌────┐  ┌────┐        │
│  │ 🎸 │  │ 🎸 │        │
│  │Guitar│ │Bass│        │
│  └────┘  └────┘        │
│  ┌────┐  ┌────┐        │
│  │ 🎻 │  │ 🎸 │        │
│  │Ukulele│Violin│       │
│  └────┘  └────┘        │
│                         │
│    ● ○ ○                │
│  [Continue]             │
└─────────────────────────┘
```

### 2. 🎸 Tuner Screen (Principal)
```
┌─────────────────────────┐
│ 🎸 Guitar - Standard ⚙️ │
├─────────────────────────┤
│                         │
│        E4               │
│      329.6 Hz           │
│                         │
│     ┌─────────┐        │
│  ←  │    │    │  →     │
│  ━━━━━━┃━━━━━━━        │
│     └─────────┘        │
│                         │
│      +5 ¢               │
│                         │
│   [Start Tuning]        │
│   [Manual Mode]         │
│                         │
│  ━━ Ad Banner ━━       │
└─────────────────────────┘
```

### 3. 🎵 Manual Tuner
```
┌─────────────────────────┐
│  ← Auto Mode            │
│                         │
│   Manual Tuner          │
│   Select a string       │
│                         │
│  ┌──────────────────┐  │
│  │ 1  E  329.6Hz    │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ 2  B  246.9Hz    │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ 3  G  196.0Hz  ✓ │  │ ← Selected
│  └──────────────────┘  │
│                         │
│  ┌──────────────────┐  │
│  │      G3          │  │
│  │   196.0 Hz       │  │
│  │ [Play Reference] │  │
│  └──────────────────┘  │
└─────────────────────────┘
```

### 4. ⏱️ Metronome
```
┌─────────────────────────┐
│  ← Back                 │
│                         │
│    Metronome            │
│                         │
│      ┌───────┐         │
│      │   3   │         │ ← Beat indicator
│      └───────┘         │
│     ● ● ○ ○            │ ← Beat dots
│                         │
│  ┌─────────────────┐   │
│  │  Tempo: 120 BPM │   │
│  │  ═════╪═════    │   │ ← Slider
│  │  [60][80][100]  │   │
│  │  [120][140][160]│   │
│  └─────────────────┘   │
│                         │
│  ┌─────────────────┐   │
│  │ Time: [4/4] ▼   │   │
│  └─────────────────┘   │
│                         │
│     [  Start  ]         │
└─────────────────────────┘
```

### 5. 🎵 Chord Library
```
┌─────────────────────────┐
│  ← Back                 │
│                         │
│  Chord Library          │
│  🎸 Guitar              │
│                         │
│  Root Note:             │
│  [C][C#][D][D#][E][F]   │
│                         │
│  Type:                  │
│  [Major][Minor][7th]    │
│                         │
│  ┌─────────────────┐   │
│  │       C         │   │
│  │   ┬─┬─┬─┬─┬─    │   │
│  │   │ │ │ │ │     │   │ ← Chord
│  │   ├─●─┼─┼─┤  1  │   │   Diagram
│  │   ├─┼─●─┼─┤  2  │   │
│  │   ├─┼─┼─●─┤  3  │   │
│  └─────────────────┘   │
│   [Play Chord]          │
└─────────────────────────┘
```

### 6. 🎓 Ear Training
```
┌─────────────────────────┐
│  ← Back                 │
│                         │
│  Ear Training           │
│                         │
│  ┌───┐ ┌───┐ ┌───┐    │
│  │ 5 │ │95%│ │50 │    │
│  │Lvl│ │Acc│ │Done│   │
│  └───┘ └───┘ └───┘    │
│                         │
│  ┌─────────────────┐   │
│  │ Identify note   │   │
│  │                 │   │
│  │      🔊         │   │ ← Play button
│  │                 │   │
│  └─────────────────┘   │
│                         │
│  [C ][C#][D ][D#]      │
│  [E ][F ][F#][G ]      │ ← Note selection
│  [G#][A ][A#][B ]      │
│                         │
│  [Check Answer]         │
└─────────────────────────┘
```

### 7. ⚙️ Settings
```
┌─────────────────────────┐
│  ← Back                 │
│                         │
│  Settings               │
│                         │
│  Calibration            │
│  ┌─────────────────┐   │
│  │ Reference: 440Hz│   │
│  └─────────────────┘   │
│                         │
│  Microphone             │
│  ┌─────────────────┐   │
│  │ Sensitivity 50% │   │
│  │ ═══════╪═══     │   │
│  └─────────────────┘   │
│                         │
│  Appearance             │
│  [Dark][Light][Vintage] │
│                         │
│  Privacy                │
│  🔒 100% Offline        │
│                         │
│  [Reset to Defaults]    │
└─────────────────────────┘
```

## 🎨 Temas de Color

### Dark Theme (Default)
- Fondo: Navy oscuro (#0A0E27)
- Primario: Azul (#4A9EFF)
- Texto: Blanco
- Acentos: Púrpura (#7B61FF)

### Light Theme
- Fondo: Blanco
- Primario: Azul oscuro
- Texto: Negro
- Acentos: Púrpura

### Vintage Theme
- Fondo: Marrón oscuro
- Primario: Dorado
- Texto: Beige
- Acentos: Marrón cálido

## 🎯 Flujo de Navegación

```
Inicio → Onboarding (primera vez)
         ↓
      Main Tabs
         ├─→ Tuner (Tab 1)
         │   ├─→ Instrument Select
         │   ├─→ Settings
         │   └─→ Manual Mode
         │
         ├─→ Metronome (Tab 2)
         ├─→ Chords (Tab 3)
         └─→ Training (Tab 4)
```

## 📊 Características Visuales

### Animaciones
- ✨ Aguja del afinador (suave, física realista)
- 💫 Pulso del metrónomo (sincronizado con audio)
- 🎨 Transiciones de pantalla (fade, slide)
- 🌈 Cambios de color según afinación

### Feedback Visual
- 🟢 Verde: Afinado (±10 cents)
- 🟡 Amarillo: Cerca (±10-25 cents)
- 🔴 Rojo: Lejos (>25 cents)

### Elementos Interactivos
- Botones con estados (normal, pressed, disabled)
- Sliders con indicadores visuales
- Cards con sombras y elevación
- Animaciones de feedback al tocar

## 🎬 Cómo se Vería Ejecutándose

1. **Inicio**: Logo animado → Onboarding
2. **Selección**: Toca guitarra → Confirma
3. **Permisos**: Permite micrófono → Confirmado ✓
4. **Tuner**: Pantalla principal con afinador listo
5. **Toca cuerda**: La aguja se mueve, muestra nota
6. **En afinación**: Toda la pantalla brilla en verde
7. **Tabs**: Desliza entre funciones
8. **Metrónomo**: Círculo pulsa con el ritmo
9. **Acordes**: Diagrama interactivo, toca para escuchar

Para ver esto en acción, necesitas ejecutar la app en un emulador o dispositivo real siguiendo la guía QUICKSTART.md
