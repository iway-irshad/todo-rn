import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { Image } from 'expo-image';

interface AnimatedSplashProps {
  onAnimationComplete?: () => void;
}

export default function AnimatedSplash({ onAnimationComplete }: AnimatedSplashProps) {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Animate the logo
    scale.value = withSequence(
      withSpring(1.2, { damping: 2 }),
      withSpring(1, { damping: 3 })
    );

    opacity.value = withTiming(1, { duration: 800 });

    // Add a subtle rotation
    rotation.value = withSequence(
      withTiming(5, { duration: 400, easing: Easing.ease }),
      withTiming(-5, { duration: 400, easing: Easing.ease }),
      withTiming(0, { duration: 400, easing: Easing.ease })
    );

    // Call onAnimationComplete after animation finishes
    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2500); // 2.5 seconds total

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F0F8FF', '#E6F4FE']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.logoContainer, animatedStyle]}>
          <Image
            source={require('@/assets/images/main-app.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Animated.Text style={styles.title}>Todo</Animated.Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4c669f',
    letterSpacing: 2,
  },
});
