import AddExpenseModal from "@/components/AddExpenseModal";
import ExpenseItem from "@/components/ExpenseItem";
import { Expenses } from "@/constants/dummy";
import { useTheme } from "@/context/ThemeContext";
import useStore from "@/state/store";
import {
  getScreenHeight,
  getScreenPercent,
  getScreenWidth,
} from "@/utils/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FAB } from "react-native-paper";

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
  const { categories, expenses } = useStore((state) => state);
  const [showAddModal, setShowAddModal] = useState(false);

  const renderExpenseItem = ({ item }: any) => (
    <ExpenseItem item={item} theme={theme} />
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.container, { backgroundColor: theme.background }]}
          // showsVerticalScrollIndicator={false}
        >
          {/* NAME CONTAINER */}
          <View style={{ paddingHorizontal: getScreenPercent(25) }}>
            <Text style={[styles.greeting, { color: theme.tint }]}>Hello,</Text>
            <Text style={[styles.name, { color: theme.text }]}>
              Jerry John Cobblah
            </Text>
          </View>

          {/* AMOUNT SPENT */}
          <View style={{ marginTop: getScreenPercent(25) }}>
            <View style={styles.amountInnerContainer}>
              <Text
                style={{ color: theme.text, fontSize: getScreenPercent(16) }}
              >
                Amount Spent
              </Text>
              <TouchableOpacity>
                <Ionicons
                  name="eye"
                  size={getScreenPercent(18)}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.amount, { color: theme.text }]}>
              $13,528.31
            </Text>
          </View>

          {/* CATEGORIES */}
          <ScrollView
            horizontal
            style={styles.categoriesContainer}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryContainer,
                  { backgroundColor: theme.altBackground },
                ]}
              >
                <Text style={[styles.categoryText, { color: theme.text }]}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: getScreenPercent(40),
              marginBottom: getScreenPercent(20),
              paddingHorizontal: getScreenPercent(25),
            }}
          >
            <Text
              style={{
                fontSize: getScreenPercent(18),
                color: theme.text,
                fontWeight: "500",
              }}
            >
              Expenses
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: theme.tint }]}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.listContainer,
            { backgroundColor: theme.altBackground },
          ]}
        >
          <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={<ListEmpty theme={theme} />}
          />
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.tabIconSelected }]}
        onPress={() => setShowAddModal(true)}
      />
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
    height: getScreenHeight(422),
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
});
