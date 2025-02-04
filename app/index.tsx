import { useTheme } from "@/context/ThemeContext";
import useStore from "@/state/store";
import {
  getScreenHeight,
  getScreenPercent,
  getScreenWidth,
} from "@/utils/responsiveness";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
} from "react-native";

const Index = () => {
  const { user, setUser } = useStore((state) => state);
  const theme = useTheme();
  const [name, setName] = useState<string>("");

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("../assets/images/10808.jpg")}
          resizeMode="center"
          style={{
            width: getScreenWidth(300),
            height: getScreenHeight(150),
          }}
          alt="Welcome Image"
        />
        <TextInput
          style={{
            backgroundColor: theme.background,
            paddingHorizontal: 10,
            paddingVertical: getScreenPercent(20),
            borderRadius: 5,
            minWidth: getScreenPercent(300),
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
