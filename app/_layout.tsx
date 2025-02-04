import RootNavigation from "@/components/RootNavigation";
import Splash from "@/components/SplashScreen";
import ThemeProvider from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { useLayoutEffect, useState } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  useLayoutEffect(() => {
    if (fontLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontLoaded, fontError]);

  if (!appReady || !splashAnimationFinished) {
    return <Splash callback={() => setSplashAnimationFinished(true)} />;
  }

  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
