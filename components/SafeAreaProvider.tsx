import { Platform, StyleSheet, View } from "react-native";
import React from "react";
// import Colors from "../constants/colors";
import { getScreenPercent, getScreenWidth } from "../utils/responsiveness";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const SafeAreaProvider: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: getScreenPercent(16) }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
    width: getScreenWidth(390),
    // paddingTop: Platform.OS === "ios" ? 0 : getScreenPercent(17), // ios doesn't need the status bar padding
  },
});

export default SafeAreaProvider;
