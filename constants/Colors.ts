/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const black = "#0D0D12";
const lightBlack = "#1C202D";
const gray = "#F6F8FA";
const gray2 = "#CCE4FF";
const blue = "#007AFF";

export const Colors = {
  light: {
    text: black,
    background: gray,
    altBackground: "#ffffff",
    tint: "#2596be",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#2596be",
  },
  dark: {
    text: "#ffffff",
    background: black,
    altBackground: lightBlack,
    tint: gray2,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#2596be",
  },
};
