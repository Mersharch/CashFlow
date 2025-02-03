import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getScreenPercent } from "@/utils/responsiveness";
import { useTheme } from "@/context/ThemeContext";

const TabLayout = () => {
  const theme = useTheme();
  const handleToggleMode = () => {
    return theme.setMode(theme.mode === "light" ? "dark" : "light");
  };
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: theme.altBackground },
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerStyle: { backgroundColor: theme.altBackground },
        headerTitleStyle: { color: theme.text },
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
      <Tabs.Screen
        name="home/index"
        options={{
          headerTitle: "CashFlow",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={getScreenPercent(24)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights/index"
        options={{
          headerTitle: "Insights",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "stats-chart-sharp" : "stats-chart-outline"}
              color={color}
              size={getScreenPercent(24)}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
