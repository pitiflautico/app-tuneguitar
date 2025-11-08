# 🔧 Implementation Notes

## Architecture Overview

### State Management
- **Context API**: Used for global state (AppContext)
- **Local State**: React hooks (useState, useEffect) for component-level state
- **Persistence**: AsyncStorage for settings and progress

### Navigation Structure
```
Stack Navigator (Root)
├── Onboarding Screen (if not completed)
└── Main Tab Navigator
    ├── Tuner (Tab 1)
    │   ├── TunerScreen
    │   └── ManualTunerScreen (Modal)
    ├── Metronome (Tab 2)
    ├── Chords (Tab 3)
    └── Training (Tab 4)
├── Instruments (Modal)
└── Settings (Modal)
```

## Audio Implementation

### Pitch Detection (`PitchDetector.ts`)

**Current Implementation** (Simplified):
- Uses `react-native-audio-recorder-player`
- Metering-based simulation for demo purposes
- Returns frequency, note, octave, and cents deviation

**Production Implementation** (Recommended):
```typescript
// For production, implement real FFT-based detection:
// 1. Capture raw PCM audio buffer
// 2. Apply Hamming window
// 3. Perform FFT using fft.js
// 4. Find fundamental frequency using:
//    - Autocorrelation method
//    - Harmonic Product Spectrum (HPS)
//    - Parabolic interpolation for accuracy
// 5. Calculate note and cents deviation
```

**Libraries to Consider**:
- `fft.js`: FFT calculations
- `pitchfinder`: Pitch detection algorithms
- Custom native modules for better performance

### Sound Generation (`SoundGenerator.ts`)

**Current Implementation**:
- Uses `react-native-sound` to play pre-recorded audio files
- Files should be placed in `assets/sounds/`

**Audio File Naming Convention**:
```
C0.mp3, Cs0.mp3, D0.mp3, ... B0.mp3
C1.mp3, Cs1.mp3, D1.mp3, ... B1.mp3
...
C8.mp3, Cs8.mp3, D8.mp3, ... B8.mp3

metronome_click.mp3
metronome_accent.mp3
```

**Alternative Implementation**:
```typescript
// For programmatic tone generation:
// Use a native module or Web Audio API equivalent
// to generate pure sine waves at specific frequencies
```

## Data Models

### Key Types

**UserSettings**:
```typescript
{
  referenceFrequency: number;    // 440Hz default
  microphoneSensitivity: number; // 0-100
  theme: 'dark' | 'light' | 'vintage';
  selectedInstrument: string;    // instrument ID
  selectedTuning: string;        // tuning ID
  hasCompletedOnboarding: boolean;
  isPremium: boolean;            // for ad removal
}
```

**UserProgress**:
```typescript
{
  exercisesCompleted: number;
  currentLevel: number;
  correctAnswers: number;
  totalAnswers: number;
  lastPlayedDate: string;        // ISO date
}
```

## Component Architecture

### Reusable Components

1. **TunerDisplay**: Visual tuner with needle animation
2. **ChordDiagram**: SVG-based chord visualization
3. **StringSelector**: Interactive string list
4. **Button**: Styled button with variants
5. **Card**: Container with shadow and styling
6. **AdBanner**: AdMob banner wrapper

### Screen Components

Each screen follows this pattern:
```typescript
interface ScreenProps {
  navigation: any; // React Navigation
}

export const Screen: React.FC<ScreenProps> = ({navigation}) => {
  const {settings, updateSettings} = useApp();
  const theme = getTheme(settings.theme);

  // Component logic

  return (
    <SafeAreaView style={{backgroundColor: theme.background}}>
      {/* Screen content */}
    </SafeAreaView>
  );
};
```

## Performance Optimizations

### Implemented
- Animated values with `useNativeDriver: true`
- Debounced audio callbacks
- Memoized components (where appropriate)
- Lazy loading of screens
- Optimized re-renders with React.memo

### Recommended
- Implement virtual lists for long chord/tuning lists
- Add image optimization
- Use Hermes JavaScript engine
- Enable ProGuard for Android release builds
- Implement code splitting

## Testing Strategy

### Unit Tests (Recommended)
```bash
# Test utilities
npm test src/utils/helpers.test.ts

# Test pitch calculations
npm test src/constants/notes.test.ts

# Test data models
npm test src/models/types.test.ts
```

### Integration Tests
- Navigation flows
- Permission handling
- Data persistence
- Audio playback

### E2E Tests
- Complete tuning workflow
- Settings changes
- Ad display and interaction
- Offline functionality

## Security Considerations

### Implemented
- No external API calls
- Local data storage only
- Secure permission handling
- No sensitive data collection

### Recommendations
- Implement app signing
- Enable code obfuscation
- Add certificate pinning if adding network features
- Regular dependency updates

## Accessibility

### Implemented
- Large touch targets (minimum 48x48dp)
- High contrast colors
- Clear visual hierarchy
- Alternative text for icons

### Recommendations
- Add screen reader support
- Implement haptic feedback
- Add sound alternatives for visual indicators
- Support dynamic type sizes

## Internationalization (i18n)

Currently hardcoded in English. To add i18n:

1. Install `react-native-i18n` or `react-i18next`
2. Create translation files:
```
locales/
  ├── en.json
  ├── es.json
  ├── fr.json
  └── ...
```
3. Wrap all text strings
4. Add language selector in Settings

## Known Limitations

### Current Implementation
1. **Pitch Detection**: Simplified simulation, not production-ready FFT
2. **Audio Files**: Requires pre-recorded samples for all notes
3. **Metronome**: JavaScript timing (may drift, consider native module)
4. **Background Mode**: Not supported (requires additional setup)

### Platform-Specific
- **iOS**: Requires App Store review for microphone usage
- **Android**: May need battery optimization whitelist for accuracy

## Deployment Checklist

### Before Release
- [ ] Replace AdMob test IDs with production IDs
- [ ] Generate release signing keys
- [ ] Optimize images and assets
- [ ] Test on multiple devices
- [ ] Verify offline functionality
- [ ] Check all permissions
- [ ] Review privacy policy
- [ ] Test ad placements
- [ ] Verify app icons and splash screens
- [ ] Run release builds
- [ ] Performance profiling

### App Store Submission
- [ ] Screenshots for all device sizes
- [ ] App description and keywords
- [ ] Privacy policy URL
- [ ] Support contact information
- [ ] Age rating questionnaire
- [ ] Export compliance information

### Play Store Submission
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (phone and tablet)
- [ ] App description (short and long)
- [ ] Content rating questionnaire
- [ ] Privacy policy URL

## Performance Metrics

### Target Metrics
- App launch time: < 2 seconds
- Pitch detection latency: < 100ms
- UI response time: < 16ms (60fps)
- Memory usage: < 100MB
- App size: < 50MB

### Monitoring
- Use React Native Performance Monitor
- Implement crash reporting (e.g., Sentry)
- Track user flows
- Monitor ad performance

## Future Technical Improvements

1. **Native Audio Module**: Better performance for pitch detection
2. **Web Audio API Bridge**: For programmatic sound generation
3. **Machine Learning**: Improved pitch recognition in noisy environments
4. **Background Processing**: Continue metronome in background
5. **Wear OS/watchOS**: Companion apps
6. **Widgets**: Quick access to tuner
7. **Shortcuts**: Siri/Google Assistant integration

## Development Tools

### Recommended VS Code Extensions
- React Native Tools
- ESLint
- Prettier
- TypeScript
- GitLens

### Debugging
- React Native Debugger
- Flipper
- Chrome DevTools

### Code Quality
- ESLint with TypeScript rules
- Prettier for formatting
- Husky for pre-commit hooks
- Jest for testing

## Support and Maintenance

### Regular Updates
- Dependency updates (monthly)
- Security patches (as needed)
- OS version compatibility
- New device support

### User Feedback
- In-app feedback form
- GitHub issues
- Email support
- App store reviews

## Resources

- [React Native Documentation](https://reactnative.dev)
- [AdMob Best Practices](https://support.google.com/admob/answer/6128543)
- [Audio Processing Guide](https://en.wikipedia.org/wiki/Pitch_detection_algorithm)
- [Material Design Guidelines](https://material.io)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
