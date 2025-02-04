import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const Splash = ({ callback }: { callback: () => void }) => {
  const waveOffset = useSharedValue(0);

  useEffect(() => {
    waveOffset.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // Call the callback after a delay (e.g., 5 seconds)
    const timer = setTimeout(callback, 5000);
    return () => clearTimeout(timer);
  }, []);

  const AnimatedText = ({ char, index }: { char: string; index: number }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY:
            Math.sin(waveOffset.value * Math.PI * 2 + index * 0.5) * 10,
        },
      ],
    }));

    return (
      <Animated.Text style={[{ fontSize: 48, color: "black" }, animatedStyle]}>
        {char}
      </Animated.Text>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        {"Ca$hFlow".split("").map((char, index) => (
          <AnimatedText key={index} char={char} index={index} />
        ))}
      </View>
    </View>
  );
};

export default Splash;
