import AddExpenseModal from "@/components/AddExpenseModal";
import ExpenseItem from "@/components/ExpenseItem";
import { useTheme } from "@/context/ThemeContext";
import useStore, { Expense } from "@/state/store";
import {
  getScreenHeight,
  getScreenPercent,
  getScreenWidth,
} from "@/utils/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CountUp } from "use-count-up";

const ListEmpty: FC<any> = ({ theme }) => {
  return (
    <View
      style={{
        height: getScreenHeight(400),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontSize: getScreenPercent(24), color: theme?.tabIconDefault }}
      >
        Click on the + to add an Expense
      </Text>
    </View>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const { categories, expenses, user } = useStore((state) => state);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  const totalSpent = expenses
    .reduce(
      (sum: number, expense: { amount: number }) => sum + expense.amount,
      0
    )
    .toFixed(2);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <ExpenseItem item={item} theme={theme} />
  );

  useEffect(() => {
    const filtered = selectedCategory
      ? expenses.filter(
          (expense) =>
            expense.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : expenses;

    setFilteredExpenses(filtered);
  }, [selectedCategory, expenses]);

  const clearCategoryFilter = () => {
    setSelectedCategory("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {/* NAME CONTAINER */}
          <View style={{ paddingHorizontal: getScreenPercent(25) }}>
            <Text style={[styles.greeting, { color: theme.tint }]}>Hello,</Text>
            <Text style={[styles.name, { color: theme.text }]}>
              {user.toLocaleUpperCase()}
            </Text>
          </View>

          {/* AMOUNT SPENT */}
          <View style={{ marginTop: getScreenPercent(25) }}>
            <View style={styles.amountInnerContainer}>
              <Text
                style={{ color: theme.text, fontSize: getScreenPercent(16) }}
              >
                Total Expenses
              </Text>
            </View>
            <Text style={[styles.amount, { color: theme.text }]}>
              $
              <CountUp isCounting end={parseFloat(totalSpent)} duration={3.2} />
            </Text>
          </View>

          {/* CATEGORIES */}
          <ScrollView
            horizontal
            style={styles.categoriesContainer}
            showsHorizontalScrollIndicator={false}
          >
            {/* Add "All" category option */}
            <Pressable
              style={[
                styles.categoryContainer,
                {
                  backgroundColor: theme.altBackground,
                  borderWidth: selectedCategory === "" ? 1 : 0,
                  borderColor:
                    selectedCategory === "" ? theme.tabIconSelected : "",
                },
              ]}
              onPress={clearCategoryFilter}
            >
              <Text style={[styles.categoryText, { color: theme.text }]}>
                All
              </Text>
            </Pressable>

            {categories.map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryContainer,
                  {
                    backgroundColor: theme.altBackground,
                    borderWidth: category.name === selectedCategory ? 1 : 0,
                    borderColor:
                      category.name === selectedCategory
                        ? theme.tabIconSelected
                        : "",
                  },
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={[styles.categoryText, { color: theme.text }]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.expenseHeaderContainer}>
            <Text
              style={{
                fontSize: getScreenPercent(18),
                color: theme.text,
                fontWeight: "500",
              }}
            >
              {selectedCategory
                ? `${selectedCategory} Expenses`
                : "All Expenses"}
            </Text>
          </View>
        </View>

        {/* FLATLIST */}
        <View
          style={[
            styles.listContainer,
            { backgroundColor: theme.altBackground },
          ]}
        >
          <FlatList
            data={filteredExpenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={<ListEmpty theme={theme} />}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons
          name="add-circle"
          size={getScreenPercent(50)}
          color={theme.tabIconSelected}
        />
      </TouchableOpacity>

      {/* ADD EXPENSE MODAL */}
      <AddExpenseModal
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getScreenPercent(25),
  },

  greeting: {
    fontSize: getScreenPercent(16),
    fontWeight: "300",
  },

  name: {
    fontSize: getScreenPercent(20),
    fontWeight: "600",
  },

  amountInnerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: getScreenPercent(25),
  },

  amount: {
    fontSize: getScreenPercent(36),
    fontWeight: "600",
    paddingHorizontal: getScreenPercent(25),
  },

  categoriesContainer: {
    marginTop: getScreenPercent(50),
    display: "flex",
    flexDirection: "row",
  },

  categoryContainer: {
    width: getScreenWidth(120),
    paddingVertical: getScreenPercent(10),
    marginHorizontal: getScreenPercent(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getScreenPercent(5),
  },

  categoryText: {
    fontSize: getScreenPercent(16),
    fontWeight: "600",
  },

  viewAllText: {
    fontSize: getScreenPercent(14),
    fontWeight: "300",
    textDecorationLine: "underline",
  },

  listContainer: {
    flex: 1,
    minHeight: getScreenHeight(422),
    borderTopRightRadius: getScreenPercent(50),
    borderTopLeftRadius: getScreenPercent(50),
    borderTopWidth: 0.15,
    paddingTop: 10,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  expenseHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getScreenPercent(40),
    marginBottom: getScreenPercent(20),
    paddingHorizontal: getScreenPercent(25),
  },
});
