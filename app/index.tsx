import { useTheme } from "@/context/ThemeContext";
import useStore from "@/state/store";
import { getScreenPercent } from "@/utils/responsiveness";
import { Redirect } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Alert } from "react-native";

const Index = () => {
  const { user, setUser } = useStore((state) => state);
  const theme = useTheme();
  const [name, setName] = useState<string>("");

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TextInput
          style={{
            backgroundColor: theme.altBackground,
            padding: 10,
            borderRadius: 5,
            minWidth: getScreenPercent(200),
            color: theme.tabIconDefault,
          }}
          placeholder="Enter your name"
          placeholderTextColor={theme.tabIconDefault}
          onChangeText={(text: string) => setName(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.tabIconSelected,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            if (!name) {
              return Alert.alert("Kindly enter your name to proceed!");
            }
            setUser(name);
          }}
        >
          <Text style={{ color: theme.altBackground }}>Set Name</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <Redirect href="/home" />;
};
export default Index;
