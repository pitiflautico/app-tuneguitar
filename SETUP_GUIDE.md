# 📚 Setup Guide - Guitar Tuna

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. iOS Setup
```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Run on iOS
npm run ios
```

### 3. Android Setup
```bash
# Run on Android
npm run android
```

## Detailed Setup Instructions

### Environment Setup

#### macOS (for iOS development)
1. Install Xcode from App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
4. Install Watchman:
   ```bash
   brew install watchman
   ```

#### Windows/Linux (for Android development)
1. Install Android Studio
2. Install Android SDK (API 33)
3. Set up ANDROID_HOME environment variable
4. Add platform-tools to PATH

### Node.js Setup
```bash
# Check Node version (should be >= 18)
node --version

# Check npm version (should be >= 9)
npm --version

# If needed, install/update Node.js from nodejs.org
```

### Project Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd app-tuneguitar
   npm install
   ```

2. **iOS Specific**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **AdMob Configuration** (Important!)
   - Get your AdMob App IDs from https://admob.google.com
   - Replace test IDs in:
     - `android/app/src/main/AndroidManifest.xml`
     - `ios/GuitarTuna/Info.plist`
     - `src/core/AdsManager.ts`

4. **Run the App**
   ```bash
   # Start Metro bundler
   npm start

   # In another terminal:
   npm run ios     # for iOS
   npm run android # for Android
   ```

## Common Issues

### iOS Build Errors

**Issue**: CocoaPods not found
```bash
sudo gem install cocoapods
cd ios && pod install
```

**Issue**: Build fails with architecture error
```bash
cd ios
pod deintegrate
pod install
```

### Android Build Errors

**Issue**: SDK not found
- Set ANDROID_HOME in your environment variables
- Add platform-tools to PATH

**Issue**: Gradle build fails
```bash
cd android
./gradlew clean
cd ..
```

### Metro Bundler Issues

**Issue**: Cache issues
```bash
npm start -- --reset-cache
```

**Issue**: Port already in use
```bash
# Kill process on port 8081
npx react-native start --port=8082
```

## Development Tips

### Hot Reload
- iOS: Cmd+D → Enable Hot Reloading
- Android: Cmd+M (Mac) or Ctrl+M (Windows) → Enable Hot Reloading

### Debug Menu
- iOS: Cmd+D
- Android: Cmd+M (Mac) or Ctrl+M (Windows)

### Debugging
```bash
# Open React Native Debugger
# Install: https://github.com/jhen0409/react-native-debugger

# Or use Chrome DevTools
# In Debug Menu → Debug
```

### Building Release

**iOS**
```bash
# Open Xcode
open ios/GuitarTuna.xcworkspace

# Select Release scheme
# Product → Archive
```

**Android**
```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

## Testing

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## Production Checklist

- [ ] Replace all test AdMob IDs with production IDs
- [ ] Update app version in package.json
- [ ] Update version code/name in native configs
- [ ] Test on multiple devices (iOS & Android)
- [ ] Test offline functionality
- [ ] Test all permission flows
- [ ] Verify all screens and navigation
- [ ] Check ad placements
- [ ] Test audio on different devices
- [ ] Verify data persistence
- [ ] Review privacy policy
- [ ] Generate app icons
- [ ] Create splash screen
- [ ] Build release versions
- [ ] Test release builds thoroughly

## Additional Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [AdMob Setup Guide](https://developers.google.com/admob/react-native/quick-start)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
