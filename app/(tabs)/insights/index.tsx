import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import useStore from "@/state/store";
import { getScreenPercent } from "@/utils/responsiveness";
import { CountUp } from "use-count-up";
import PieChart, { Slice } from "react-native-pie-chart";
import { getExpenseSeries } from "@/utils/getExpenseSeries";

const Insights = () => {
  const theme = useTheme();
  const { categories, expenses } = useStore((state) => state);
  const series = getExpenseSeries(expenses, categories);

  if (series.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.background,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: getScreenPercent(24),
            color: theme?.tabIconDefault,
            textAlign: "center",
          }}
        >
          Add an expense to view your insights
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* CHART */}
      <View
        style={{
          flex: 0.3,
          display: "flex",
          marginTop: 10,
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PieChart
          widthAndHeight={getScreenPercent(250)}
          series={series}
          cover={0.6}
        />
      </View>

      {/* CARDS */}
      <View style={{ flex: 1, marginTop: getScreenPercent(50) }}>
        <FlatList
          data={series}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={[
                styles.cardContainer,
                {
                  borderColor: item.color,
                  backgroundColor: theme.altBackground,
                },
              ]}
            >
              <Text
                style={{ color: theme.text, fontSize: getScreenPercent(24) }}
              >
                $
                <CountUp
                  isCounting
                  end={parseFloat(item.value.toString())}
                  duration={2}
                />
              </Text>
              <Text
                style={{
                  color: item.color,
                  fontSize: getScreenPercent(24),
                }}
              >
                {item.label}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Insights;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: getScreenPercent(150),
    borderRadius: 10,
    borderWidth: 0.5,
    gap: getScreenPercent(10),
  },
});
