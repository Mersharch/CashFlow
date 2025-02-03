import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { PieChart } from "react-native-gifted-charts";

const Insights = () => {
  const theme = useTheme();
  const pieData = [
    { value: 54, color: "#177AD5", shiftX: 10, shiftY: -10 },
    { value: 40, color: "#79D2DE", shiftX: -10, shiftY: -5 },
    { value: 20, color: "#ED6665", shiftX: -10, shiftY: -18 },
  ];
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PieChart data={pieData} />
      </View>
      <View style={{ flex: 1 }}></View>
    </ScrollView>
  );
};

export default Insights;
