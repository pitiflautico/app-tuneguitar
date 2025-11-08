# 📱 CÓMO VER LA APP - Guía Definitiva para Linux

Estás en **Linux**, por lo que iOS no es opción. Aquí están tus rutas:

---

## 🥇 **RECOMENDACIÓN: Android Studio (La mejor experiencia)**

### Por qué esta opción:
- ✅ Verás la app **exactamente** como fue diseñada
- ✅ Todas las funcionalidades funcionarán
- ✅ Podrás debuggear y modificar
- ✅ Es el entorno de desarrollo estándar

### Instalación (15-20 minutos):

#### 1. Descarga Android Studio
```bash
# Ve a: https://developer.android.com/studio
# Descarga: android-studio-2024.x.x.x-linux.tar.gz
```

#### 2. Instala
```bash
cd ~/Downloads
tar -xvf android-studio-*.tar.gz
sudo mv android-studio /opt/
cd /opt/android-studio/bin
./studio.sh
```

#### 3. Configuración inicial
Cuando se abra Android Studio:
- ✓ Choose "Standard" installation
- ✓ Accept Android SDK license
- ✓ Wait for downloads to complete

#### 4. Configura variables de entorno
```bash
# Agrega esto a ~/.bashrc o ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Recarga tu terminal
source ~/.bashrc  # o source ~/.zshrc
```

#### 5. Crea un emulador
```bash
# Abre Android Studio
# Tools → Device Manager → Create Device
#
# Recomendado:
# - Device: Pixel 5
# - System Image: API 33 (Android 13)
# - RAM: 2048 MB
# - Click Finish
```

#### 6. Inicia el emulador
```bash
# En Android Studio:
# Device Manager → Click ▶️ en tu dispositivo virtual

# O desde terminal:
emulator -avd Pixel_5_API_33
```

#### 7. Ejecuta tu app
```bash
cd /home/user/app-tuneguitar
npm run android
```

**¡LISTO! Tu app se instalará y abrirá automáticamente** 🎉

---

## 🥈 **ALTERNATIVA: Usar tu Teléfono Android Físico**

### Ventajas:
- ✅ No necesitas instalar emuladores
- ✅ Pruebas en dispositivo real
- ✅ Rendimiento completo

### Pasos:

#### 1. Habilita Modo Desarrollador en tu teléfono
```
1. Ajustes → Acerca del teléfono
2. Toca 7 veces en "Número de compilación"
3. Vuelve atrás
4. Entra en "Opciones de desarrollo"
5. Activa "Depuración USB"
```

#### 2. Conecta tu teléfono
```bash
# Conecta por USB

# Verifica que se detecta
adb devices

# Deberías ver algo como:
# List of devices attached
# ABC123XYZ    device
```

#### 3. Ejecuta la app
```bash
npm run android
```

**La app se instalará directamente en tu teléfono** 📱

---

## 🥉 **DEMO RÁPIDO: Expo Go (Limitado)**

Si solo quieres ver una demo rápida sin la funcionalidad completa:

```bash
# Crea proyecto demo
./create-expo-demo.sh

# Sigue las instrucciones que aparecen
```

**Nota**: Esta opción NO incluye todas las funcionalidades (audio, permisos, ads).

---

## 📊 **Comparación de Opciones**

| Opción | Tiempo Setup | Funcionalidad | Recomendado |
|--------|--------------|---------------|-------------|
| Android Studio | 20 min | 100% ✅ | ⭐⭐⭐⭐⭐ |
| Teléfono Físico | 5 min | 100% ✅ | ⭐⭐⭐⭐ |
| Expo Demo | 5 min | ~40% ⚠️ | ⭐⭐ |

---

## 🎯 **Mi Recomendación Personal**

**Usa Android Studio** porque:
1. Es el setup estándar para React Native
2. Lo necesitarás para desarrollo futuro
3. Es más fácil debuggear
4. Puedes probar en múltiples versiones de Android

**Tiempo total desde cero**: ~25 minutos
**Resultado**: App funcionando al 100%

---

## 🆘 **Problemas Comunes y Soluciones**

### "adb not found"
```bash
# Asegúrate de que Android SDK está en el PATH
echo $ANDROID_HOME
# Debería mostrar: /home/tu-usuario/Android/Sdk
```

### "No connected devices"
```bash
# Lista dispositivos
adb devices

# Si no aparece nada, reconecta USB
adb kill-server
adb start-server
```

### "Metro bundler failed to start"
```bash
# Limpia caché
npm start -- --reset-cache
```

### "Emulator is slow"
```bash
# En AVD Manager:
# Edit device → Advanced Settings
# Graphics: Hardware - GLES 2.0
# RAM: 2048 MB
```

---

## 📺 **Mientras Instalas Android Studio...**

Puedes explorar el código:

```bash
# Ver todas las pantallas
ls -la src/screens/

# Ver componentes
ls -la src/components/

# Leer código del afinador
cat src/screens/TunerScreen.tsx

# Ver navegación
cat src/navigation/AppNavigator.tsx
```

O lee la documentación:
- `VISUAL_PREVIEW.md` - Ver cómo se ve la app (ASCII art)
- `FEATURES.md` - Lista completa de funcionalidades
- `IMPLEMENTATION_NOTES.md` - Detalles técnicos

---

## ✅ **Checklist de Setup**

```
[ ] Android Studio descargado
[ ] Android Studio instalado
[ ] SDK configurado
[ ] Variables de entorno agregadas
[ ] Emulador creado
[ ] Emulador iniciado
[ ] npm run android ejecutado
[ ] ¡App corriendo! 🎉
```

---

## 💡 **Tip Final**

Una vez que tengas Android Studio instalado, todo será más fácil:

```bash
# Cada vez que quieras desarrollar:
1. Abre Android Studio
2. Inicia el emulador
3. npm run android
4. ¡Listo!
```

**Tiempo después del setup inicial: 2 minutos** ⚡

---

¿Prefieres que te guíe paso a paso por la instalación de Android Studio? ¡Es más fácil de lo que parece! 😊
