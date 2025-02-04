import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { StatusBar } from "react-native";

const RootNavigation = () => {
  const theme = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar />
    </>
  );
};

export default RootNavigation;
