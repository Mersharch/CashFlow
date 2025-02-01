import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  children: ReactNode;
};
interface ThemeContextProps {
  background: string;
  altBackground: string;
  text: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

type Mode = "light" | "dark";

export const ThemeContext = createContext<ThemeContextProps>({
  background: "",
  altBackground: "",
  text: "",
  tint: "",
  icon: "",
  tabIconDefault: "",
  tabIconSelected: "",
  mode: "light",
  setMode: () => {},
});

const ThemeProvider: FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(useColorScheme() ?? "light");

  const contextValues = {
    ...(mode === "light" ? Colors.light : Colors.dark),
    mode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
