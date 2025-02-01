import { Platform, StyleSheet, View } from "react-native";
import React from "react";
// import Colors from "../constants/colors";
import { getScreenPercent, getScreenWidth } from "../utils/responsiveness";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  children: React.ReactNode;
}

const SafeAreaProvider: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};

export default SafeAreaProvider;
