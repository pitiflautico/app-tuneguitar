# 🔴 Error: "Property 'require' doesn't exist"

## ❌ El Problema

Estás viendo este error porque estás intentando ejecutar un proyecto **React Native CLI** con **Expo**, y no son compatibles directamente.

```
[runtime not ready]: ReferenceError: Property 'require' doesn't exist
```

---

## 📁 Los Dos Proyectos

### Proyecto 1: React Native CLI (Original)
```
📂 /Users/danielperezpinazo/Projects/app-tuneguitar
❌ NO funciona con "npx expo start"
✅ SÍ funciona con Android Studio / Xcode
```

### Proyecto 2: Expo (Nuevo)
```
📂 /home/user/guitar-tuna-expo
✅ SÍ funciona con "npx expo start"
❌ NO está en tu Mac local
```

---

## ✅ SOLUCIÓN RÁPIDA

### **Opción A: Crear Proyecto Expo en tu Mac** (Recomendado)

```bash
# 1. Descarga el script setup
curl -o setup-expo.sh https://pastebin.com/raw/XXXXXX

# O copia el contenido manualmente y ejecuta:

# 2. Crear proyecto
cd ~
npx create-expo-app@latest GuitarTunaExpo --template blank-typescript

# 3. Instalar dependencias
cd GuitarTunaExpo
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler @react-native-async-storage/async-storage
npm install react-native-svg @react-native-community/slider

# 4. Crear estructura
mkdir -p src/{screens,components,core,models,utils,navigation,context,constants}

# 5. Copiar código (ver abajo)
```

---

## 📋 Copiar el Código Fuente

Tienes que copiar estos archivos del proyecto original al nuevo:

### **Manual (Copia y Pega):**

```bash
# Desde: /home/user/guitar-tuna-expo/src/
# Hasta: ~/GuitarTunaExpo/src/

# Carpetas a copiar:
- src/components/
- src/screens/
- src/core/
- src/models/
- src/constants/
- src/context/
- src/navigation/
- src/utils/

# Archivo principal:
- App.tsx (desde guitar-tuna-expo)
```

### **O usa Git:**

Si tienes acceso al repositorio:

```bash
# Clonar el proyecto Expo completo
git clone [TU-REPO] guitar-tuna-expo-local
cd guitar-tuna-expo-local
npm install
npx expo start
```

---

## 🚀 Ejecutar la App

Una vez que tengas el proyecto configurado:

```bash
cd ~/GuitarTunaExpo
npx expo start
```

Luego:
1. Descarga **Expo Go** en tu iPhone
2. Escanea el QR con la Cámara
3. ¡Listo! 🎉

---

## 🔧 Opción B: Arreglar el Proyecto Actual

Si quieres quedarte en `/Users/danielperezpinazo/Projects/app-tuneguitar`:

```bash
# 1. Limpia todo
cd /Users/danielperezpinazo/Projects/app-tuneguitar
rm -rf node_modules
rm -rf .expo
rm package-lock.json

# 2. Reinstala
npm install

# 3. Intenta de nuevo
npx expo start -c
```

**Pero honestamente, es más fácil crear uno nuevo con Expo desde cero.**

---

## 📦 Proyecto Expo Completo Listo

El proyecto completo y funcional está aquí:

```
📂 /home/user/guitar-tuna-expo
```

Necesitas copiarlo a tu Mac. Opciones:

### **1. Con Git:**
```bash
# Si está en el repo
git pull origin claude/react-native-offline-app-011CUvdt5rihWFGHBi6QUDJs
cd guitar-tuna-expo
npm install
npx expo start
```

### **2. Con SCP (si tienes acceso SSH):**
```bash
scp -r user@servidor:/home/user/guitar-tuna-expo ~/GuitarTunaExpo
cd ~/GuitarTunaExpo
npm install
npx expo start
```

### **3. Manual:**
Copia los archivos uno por uno del servidor a tu Mac.

---

## 🎯 Resumen

```
❌ NO HAGAS ESTO:
   cd /Users/danielperezpinazo/Projects/app-tuneguitar
   npx expo start
   ☝️ Esto da error "require doesn't exist"

✅ HAZ ESTO:
   cd ~/GuitarTunaExpo  (proyecto nuevo)
   npx expo start
   ☝️ Esto funciona perfectamente
```

---

## 🆘 ¿Necesitas Ayuda?

**Opción más rápida:** Te creo todos los archivos desde cero aquí mismo.

**Opción más completa:** Sigue los pasos de Opción A arriba.

---

## 📝 Archivos que Necesitas

Si quieres crear el proyecto manualmente, estos son los archivos esenciales:

```
GuitarTunaExpo/
├── App.tsx                    ← Punto de entrada
├── app.json                   ← Config Expo
├── package.json               ← Dependencias
└── src/
    ├── components/            ← 6 archivos
    ├── screens/               ← 8 archivos
    ├── core/                  ← 3 archivos
    ├── models/                ← 1 archivo
    ├── constants/             ← 4 archivos
    ├── context/               ← 1 archivo
    ├── navigation/            ← 1 archivo
    └── utils/                 ← 2 archivos
```

**Total:** ~26 archivos TypeScript

¿Quieres que los cree todos aquí para que los copies?
