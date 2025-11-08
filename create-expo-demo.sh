#!/bin/bash

echo "🎸 Creando demo de Guitar Tuna con Expo..."
echo ""

cd ..
npx create-expo-app guitar-tuna-demo --template blank-typescript

cd guitar-tuna-demo

# Instalar dependencias necesarias
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
npm install @react-native-async-storage/async-storage

echo ""
echo "✅ Demo creado!"
echo ""
echo "Próximos pasos:"
echo "1. cd ../guitar-tuna-demo"
echo "2. Copia el código de src/ del proyecto principal"
echo "3. npx expo start"
echo "4. Escanea el QR con Expo Go en tu teléfono"
echo ""
