#!/bin/bash

echo "🔧 Limpiando proyecto para Expo..."

# Ir al directorio del proyecto
cd "$(dirname "$0")"

# Limpiar caché
rm -rf node_modules
rm -rf .expo
rm -rf ios/Pods
rm -rf ios/build
rm -rf android/app/build
rm -rf android/.gradle

echo "📦 Reinstalando dependencias..."
npm install

echo "✨ Limpiando caché de Expo..."
npx expo start -c

echo ""
echo "✅ Listo! Ahora ejecuta:"
echo "   npx expo start"
echo ""
