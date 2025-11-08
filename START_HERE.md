# 🚀 CÓMO EJECUTAR Y VER LA APP

## ¡Bienvenido! Aquí está tu app Guitar Tuna lista para ejecutar 🎸

---

## ⚡ Inicio Rápido (Elige tu opción)

### 🟢 OPCIÓN A: Tengo Android Studio instalado

```bash
# 1. Abre Android Studio
# 2. Abre AVD Manager y lanza un emulador
# 3. En la terminal del proyecto:

npm start

# 4. En otra terminal (o presiona 'a' en Metro):
npm run android
```

**La app se instalará automáticamente en tu emulador** ✅

---

### 🔵 OPCIÓN B: Tengo un Mac con Xcode

```bash
# 1. Instala pods de iOS:
cd ios
pod install
cd ..

# 2. Inicia Metro:
npm start

# 3. En otra terminal (o presiona 'i' en Metro):
npm run ios
```

**La app se abrirá en el simulador de iOS** ✅

---

### 🟡 OPCIÓN C: Quiero usar mi teléfono Android

```bash
# 1. En tu teléfono:
#    - Ve a Ajustes > Acerca del teléfono
#    - Toca 7 veces en "Número de compilación"
#    - Vuelve y entra en "Opciones de desarrollo"
#    - Activa "Depuración USB"

# 2. Conecta el teléfono por USB a tu computadora

# 3. Ejecuta:
npm run android
```

**La app se instalará en tu teléfono** ✅

---

### 🟣 OPCIÓN D: No tengo nada configurado aún

**No hay problema!** Aquí está lo que necesitas:

#### Para Android (Windows, Mac, Linux):
1. Descarga [Android Studio](https://developer.android.com/studio)
2. Durante instalación, asegúrate de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Abre Android Studio → Tools → AVD Manager
4. Crea un dispositivo virtual (recomiendo Pixel 5, API 33)
5. Lanza el emulador
6. Ejecuta: `npm run android`

#### Para iOS (Solo Mac):
1. Descarga Xcode desde App Store
2. Abre Xcode → Preferences → Locations
3. Selecciona Command Line Tools
4. Instala CocoaPods: `sudo gem install cocoapods`
5. Ejecuta: `cd ios && pod install && cd ..`
6. Ejecuta: `npm run ios`

---

## 📱 ¿Qué verás cuando ejecutes la app?

### Primera vez (Onboarding):
1. **Pantalla 1**: Selecciona tu instrumento (Guitarra, Bajo, Ukelele, etc.)
2. **Pantalla 2**: Permite acceso al micrófono
3. **Pantalla 3**: ¡Listo para afinar!

### Pantalla Principal:
- **Tab 1 - Tuner**: Afinador automático con detección en tiempo real
- **Tab 2 - Metronome**: Metrónomo con BPM ajustable
- **Tab 3 - Chords**: Biblioteca de acordes con diagramas
- **Tab 4 - Training**: Ejercicios de entrenamiento auditivo

---

## 🔧 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS (Mac solamente)
npm run ios

# Limpiar caché si hay problemas
npm start -- --reset-cache

# Ver estructura del proyecto
tree -L 2 src/
```

---

## ❓ Solución de Problemas Rápida

### "Metro no inicia"
```bash
npm start -- --reset-cache
```

### "No encuentra el dispositivo Android"
```bash
# Verifica que el emulador está corriendo
adb devices

# Deberías ver algo como:
# List of devices attached
# emulator-5554   device
```

### "Error en iOS con pods"
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### "Puerto 8081 ocupado"
```bash
# Mata el proceso anterior
lsof -ti:8081 | xargs kill
npm start
```

---

## 🎯 Próximos Pasos Después de Ver la App

Una vez que la tengas corriendo:

1. ✅ Explora todas las pantallas y funcionalidades
2. ✅ Revisa el código en `src/screens/` para ver cómo está construida
3. ✅ Lee `FEATURES.md` para entender todas las características
4. ✅ Personaliza los colores en `src/constants/themes.ts`
5. ✅ Agrega tus propios IDs de AdMob para producción

---

## 📚 Documentación Adicional

- **README.md** - Descripción general del proyecto
- **SETUP_GUIDE.md** - Guía detallada de configuración
- **FEATURES.md** - Lista completa de funcionalidades
- **IMPLEMENTATION_NOTES.md** - Detalles técnicos de implementación
- **QUICKSTART.md** - Guía rápida de inicio
- **VISUAL_PREVIEW.md** - Vista previa visual de las pantallas

---

## 💡 Tip: Inicio más Rápido

Si solo quieres ver el código y la estructura sin ejecutar:

```bash
# Ver todas las pantallas
cat src/screens/TunerScreen.tsx
cat src/screens/MetronomeScreen.tsx
cat src/screens/ChordsScreen.tsx

# Ver componentes
cat src/components/TunerDisplay.tsx
cat src/components/ChordDiagram.tsx

# Ver la navegación
cat src/navigation/AppNavigator.tsx
```

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa `QUICKSTART.md` para instrucciones detalladas
2. Revisa `IMPLEMENTATION_NOTES.md` para detalles técnicos
3. Busca el error en Google (probablemente alguien ya lo resolvió)
4. Revisa la [documentación oficial de React Native](https://reactnative.dev/docs/getting-started)

---

## ✨ ¡Disfruta tu app Guitar Tuna!

La aplicación incluye:
- ✅ Afinador automático con detección de tono
- ✅ Afinador manual con tonos de referencia
- ✅ 5 instrumentos (Guitarra, Bajo, Ukelele, Violín, Mandolina)
- ✅ Metrónomo con múltiples compases
- ✅ Biblioteca de acordes interactiva
- ✅ Ejercicios de entrenamiento auditivo
- ✅ 3 temas visuales
- ✅ 100% offline
- ✅ Publicidad integrada (AdMob)

**¡Todo listo para compilar y publicar!** 🚀
