// LivingBackground.tsx - Aurora / Living Background Component
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LivingBackground: React.FC = () => {
  // Blob 1 - Mavi (#60A5FA)
  const blob1X = useRef(new Animated.Value(SCREEN_WIDTH * 0.2)).current;
  const blob1Y = useRef(new Animated.Value(SCREEN_HEIGHT * 0.3)).current;
  const blob1Scale = useRef(new Animated.Value(1)).current;

  // Blob 2 - Mor (#A78BFA)
  const blob2X = useRef(new Animated.Value(SCREEN_WIDTH * 0.7)).current;
  const blob2Y = useRef(new Animated.Value(SCREEN_HEIGHT * 0.5)).current;
  const blob2Scale = useRef(new Animated.Value(1)).current;

  // Blob 3 - Yeşil (#34D399)
  const blob3X = useRef(new Animated.Value(SCREEN_WIDTH * 0.5)).current;
  const blob3Y = useRef(new Animated.Value(SCREEN_HEIGHT * 0.7)).current;
  const blob3Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Blob 1 Animations - Mavi
    const animateBlob1X = Animated.loop(
      Animated.sequence([
        Animated.timing(blob1X, {
          toValue: SCREEN_WIDTH * 0.3,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(blob1X, {
          toValue: SCREEN_WIDTH * 0.1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(blob1X, {
          toValue: SCREEN_WIDTH * 0.2,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob1Y = Animated.loop(
      Animated.sequence([
        Animated.timing(blob1Y, {
          toValue: SCREEN_HEIGHT * 0.4,
          duration: 5500,
          useNativeDriver: true,
        }),
        Animated.timing(blob1Y, {
          toValue: SCREEN_HEIGHT * 0.2,
          duration: 5500,
          useNativeDriver: true,
        }),
        Animated.timing(blob1Y, {
          toValue: SCREEN_HEIGHT * 0.3,
          duration: 5500,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob1Scale = Animated.loop(
      Animated.sequence([
        Animated.timing(blob1Scale, {
          toValue: 1.2,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(blob1Scale, {
          toValue: 0.9,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(blob1Scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    // Blob 2 Animations - Mor
    const animateBlob2X = Animated.loop(
      Animated.sequence([
        Animated.timing(blob2X, {
          toValue: SCREEN_WIDTH * 0.6,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(blob2X, {
          toValue: SCREEN_WIDTH * 0.8,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(blob2X, {
          toValue: SCREEN_WIDTH * 0.7,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob2Y = Animated.loop(
      Animated.sequence([
        Animated.timing(blob2Y, {
          toValue: SCREEN_HEIGHT * 0.4,
          duration: 5800,
          useNativeDriver: true,
        }),
        Animated.timing(blob2Y, {
          toValue: SCREEN_HEIGHT * 0.6,
          duration: 5800,
          useNativeDriver: true,
        }),
        Animated.timing(blob2Y, {
          toValue: SCREEN_HEIGHT * 0.5,
          duration: 5800,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob2Scale = Animated.loop(
      Animated.sequence([
        Animated.timing(blob2Scale, {
          toValue: 0.85,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(blob2Scale, {
          toValue: 1.15,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(blob2Scale, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }),
      ])
    );

    // Blob 3 Animations - Yeşil
    const animateBlob3X = Animated.loop(
      Animated.sequence([
        Animated.timing(blob3X, {
          toValue: SCREEN_WIDTH * 0.4,
          duration: 5500,
          useNativeDriver: true,
        }),
        Animated.timing(blob3X, {
          toValue: SCREEN_WIDTH * 0.6,
          duration: 5500,
          useNativeDriver: true,
        }),
        Animated.timing(blob3X, {
          toValue: SCREEN_WIDTH * 0.5,
          duration: 5500,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob3Y = Animated.loop(
      Animated.sequence([
        Animated.timing(blob3Y, {
          toValue: SCREEN_HEIGHT * 0.6,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(blob3Y, {
          toValue: SCREEN_HEIGHT * 0.8,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(blob3Y, {
          toValue: SCREEN_HEIGHT * 0.7,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    );

    const animateBlob3Scale = Animated.loop(
      Animated.sequence([
        Animated.timing(blob3Scale, {
          toValue: 1.1,
          duration: 4200,
          useNativeDriver: true,
        }),
        Animated.timing(blob3Scale, {
          toValue: 0.95,
          duration: 4200,
          useNativeDriver: true,
        }),
        Animated.timing(blob3Scale, {
          toValue: 1,
          duration: 4200,
          useNativeDriver: true,
        }),
      ])
    );

    // Start all animations in parallel
    Animated.parallel([
      animateBlob1X,
      animateBlob1Y,
      animateBlob1Scale,
      animateBlob2X,
      animateBlob2Y,
      animateBlob2Scale,
      animateBlob3X,
      animateBlob3Y,
      animateBlob3Scale,
    ]).start();

    // Cleanup function
    return () => {
      animateBlob1X.stop();
      animateBlob1Y.stop();
      animateBlob1Scale.stop();
      animateBlob2X.stop();
      animateBlob2Y.stop();
      animateBlob2Scale.stop();
      animateBlob3X.stop();
      animateBlob3Y.stop();
      animateBlob3Scale.stop();
    };
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Blob 1 - Mavi */}
      <Animated.View
        style={[
          styles.blob,
          styles.blob1,
          {
            transform: [
              { translateX: blob1X },
              { translateY: blob1Y },
              { scale: blob1Scale },
            ],
          },
        ]}
      />
      
      {/* Blob 2 - Mor */}
      <Animated.View
        style={[
          styles.blob,
          styles.blob2,
          {
            transform: [
              { translateX: blob2X },
              { translateY: blob2Y },
              { scale: blob2Scale },
            ],
          },
        ]}
      />
      
      {/* Blob 3 - Yeşil */}
      <Animated.View
        style={[
          styles.blob,
          styles.blob3,
          {
            transform: [
              { translateX: blob3X },
              { translateY: blob3Y },
              { scale: blob3Scale },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Behind all content but visible
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.4,
  },
  blob1: {
    backgroundColor: '#60A5FA', // Mavi
    top: -150,
    left: -150,
  },
  blob2: {
    backgroundColor: '#A78BFA', // Mor
    top: -150,
    left: -150,
  },
  blob3: {
    backgroundColor: '#34D399', // Yeşil
    top: -150,
    left: -150,
  },
});

export default LivingBackground;
