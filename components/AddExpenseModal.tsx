import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import useStore, { Expense, ExpenseCategory } from "@/state/store";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getScreenPercent } from "@/utils/responsiveness";
import { SelectList } from "react-native-dropdown-select-list";
import { useTheme } from "@/context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddExpenseModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [name, setName] = useState("");

  const { categories, addExpense } = useStore((state) => state);
  const formattedCategories = categories.map((category, index) => {
    return {
      key: index,
      value: category,
    };
  });

  const handleSubmit = () => {
    if (!amount || !name || !category)
      return Alert.alert("All fields are required.");

    addExpense({
      amount: parseFloat(amount),
      category,
      name: name,
      date: new Date(),
    });

    // Reset form
    setAmount("");
    setName("");
    setCategory("Food");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={insets.top}
        style={styles.modalBackground}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text>Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g 3200.00"
              placeholderTextColor={theme.tabIconDefault}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text>Expense:</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g Uber"
              placeholderTextColor={theme.tabIconDefault}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text>Category:</Text>
            <View>
              <SelectList
                setSelected={(val: ExpenseCategory) => setCategory(val)}
                data={formattedCategories}
                save="value"
                dropdownStyles={styles.dropDownStyles}
                boxStyles={styles.input}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: getScreenPercent(10),
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },

  inputContainer: {
    flexDirection: "column",
    marginBottom: 15,
    gap: 10,
  },

  dropDownStyles: {
    borderWidth: 1,
    borderColor: "#ddd",
  },

  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
