import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { getScreenPercent } from "@/utils/responsiveness";

const RootNavigation = () => {
  const theme = useTheme();

  const handleToggleMode = () => {
    return theme.setMode(theme.mode === "light" ? "dark" : "light");
  };
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.altBackground },
        headerTitleStyle: { color: theme.text },
        headerTitle: "CashFlow",
        headerRight: () => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="notifications-circle"
                  size={getScreenPercent(24)}
                  color={theme.tint}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleToggleMode}>
                <Ionicons
                  name="invert-mode"
                  size={getScreenPercent(24)}
                  color={theme.tint}
                />
              </TouchableOpacity>
            </View>
          );
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default RootNavigation;
