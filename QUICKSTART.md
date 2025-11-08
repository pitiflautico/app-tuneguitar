# 🚀 Guía Rápida de Ejecución

## Opción 1: Ejecutar en Expo Go (Más Rápido)

Si quieres verlo funcionando rápidamente sin configurar Android Studio o Xcode:

### Convertir a Expo (Recomendado para pruebas rápidas)

```bash
# Instalar Expo CLI globalmente
npm install -g expo-cli

# Instalar Expo en el proyecto
npx expo install

# Iniciar con Expo
npx expo start
```

Luego escanea el código QR con la app **Expo Go** en tu teléfono.

---

## Opción 2: Ejecutar en Android (Requiere Android Studio)

### Requisitos previos:
1. **Android Studio** instalado
2. **Android SDK** (API 33)
3. **Java Development Kit (JDK 11+)**
4. Un **emulador Android** configurado o un **dispositivo físico**

### Pasos:

```bash
# 1. Verificar que Android SDK esté configurado
echo $ANDROID_HOME
# Debería mostrar algo como: /Users/tu-usuario/Library/Android/sdk

# 2. Iniciar un emulador Android desde Android Studio
# O conectar tu dispositivo Android por USB con depuración USB habilitada

# 3. Iniciar Metro Bundler
npm start

# 4. En otra terminal, ejecutar en Android
npm run android
```

La app se instalará automáticamente en tu emulador/dispositivo y se abrirá.

---

## Opción 3: Ejecutar en iOS (Solo macOS, requiere Xcode)

### Requisitos previos:
1. **macOS**
2. **Xcode 14+** instalado
3. **CocoaPods** instalado
4. Un **simulador iOS** o **dispositivo físico**

### Pasos:

```bash
# 1. Instalar dependencias de CocoaPods
cd ios
pod install
cd ..

# 2. Iniciar Metro Bundler
npm start

# 3. En otra terminal, ejecutar en iOS
npm run ios

# O especificar un simulador:
npm run ios -- --simulator="iPhone 15 Pro"
```

---

## 🎯 Prueba Rápida sin Dispositivo

Si solo quieres revisar el código y la estructura:

### 1. Ver estructura del proyecto
```bash
tree -L 2 src/
```

### 2. Ver las pantallas principales
```bash
ls src/screens/
```

### 3. Iniciar Metro Bundler
```bash
npm start
```

Verás un menú con opciones:
- Presiona `a` para abrir en Android
- Presiona `i` para abrir en iOS
- Presiona `w` para abrir en web (requiere configuración adicional)

---

## 📱 Ejecutar en tu Dispositivo Físico

### Android:
1. Habilita "Opciones de desarrollo" en tu Android:
   - Ve a Configuración → Acerca del teléfono
   - Toca 7 veces en "Número de compilación"
2. Habilita "Depuración USB"
3. Conecta el teléfono por USB
4. Ejecuta: `npm run android`

### iOS (requiere cuenta de desarrollador):
1. Conecta tu iPhone
2. Abre `ios/GuitarTuna.xcworkspace` en Xcode
3. Selecciona tu dispositivo
4. Presiona el botón ▶️ Play

---

## ⚡ Ver el Código en Acción (sin ejecutar)

Si no tienes configurado el entorno de desarrollo, puedes:

### 1. Revisar los componentes principales:
```bash
# Afinador automático
cat src/screens/TunerScreen.tsx

# Metrónomo
cat src/screens/MetronomeScreen.tsx

# Biblioteca de acordes
cat src/screens/ChordsScreen.tsx
```

### 2. Ver la navegación:
```bash
cat src/navigation/AppNavigator.tsx
```

### 3. Ver los temas:
```bash
cat src/constants/themes.ts
```

---

## 🐛 Solución de Problemas

### Error: "Metro Bundler no inicia"
```bash
# Limpiar caché
npm start -- --reset-cache
```

### Error: "No se encuentra Android SDK"
```bash
# Configurar variable de entorno (Linux/Mac)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Error: "CocoaPods no instalado" (iOS)
```bash
sudo gem install cocoapods
```

### Error en compilación Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

---

## 📺 Ver un Demo Visual

Mientras configuras tu entorno, puedes explorar:

1. **Estructura de archivos** - Revisa `src/` para ver todos los componentes
2. **Documentación** - Lee `FEATURES.md` para ver todas las funcionalidades
3. **Configuración** - Revisa `IMPLEMENTATION_NOTES.md` para detalles técnicos

---

## 🎬 Próximo Paso Recomendado

**Para la forma más rápida de ver la app funcionando:**

```bash
# Opción más simple: Usar Expo
npx create-expo-app --template blank-typescript temp-expo
# Luego copiar el código src/ a ese proyecto

# O si tienes Android Studio configurado:
npm run android
```

¿Tienes Android Studio o Xcode instalado? Te puedo ayudar con la configuración específica.
