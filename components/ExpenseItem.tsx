import { useTheme } from "@/context/ThemeContext";
import useStore, { Expense, ExpenseCategory } from "@/state/store";
import { getScreenPercent } from "@/utils/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ExpenseItemProps {
  item: Expense;
  theme: any;
}

const ExpenseItem = memo(({ item, theme }: ExpenseItemProps) => {
  const { categories } = useStore((state) => state);

  const category: ExpenseCategory | undefined = categories.find(
    (c) => c.name?.toLocaleLowerCase() === item.category.toLocaleLowerCase()
  );
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.itemIconContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <Ionicons
            name={category?.icon}
            size={getScreenPercent(24)}
            color={category?.color}
          />
        </View>
        <View style={styles.itemText}>
          <Text style={[styles.itemTitle, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.itemSubtitle, { color: theme.tabIconDefault }]}>
            {category?.name}
          </Text>
        </View>
      </View>
      <View style={[styles.itemText, { alignItems: "flex-end" }]}>
        <Text style={[styles.itemTitle, { color: theme.text }]}>
          ${item.amount.toLocaleString()}
        </Text>
        <Text style={[styles.itemSubtitle, { color: theme.tabIconDefault }]}>
          {item.date}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getScreenPercent(15),
    marginVertical: getScreenPercent(15),
  },

  itemLeft: {
    display: "flex",
    flexDirection: "row",
    gap: getScreenPercent(15),
  },

  itemIconContainer: {
    padding: getScreenPercent(10),
    borderRadius: getScreenPercent(20),
  },

  itemText: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  itemTitle: {
    fontSize: getScreenPercent(18),
    fontWeight: "500",
  },

  itemSubtitle: {
    fontSize: getScreenPercent(14),
    fontWeight: "300",
  },
});

export default ExpenseItem;
