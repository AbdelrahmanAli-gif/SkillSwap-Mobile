import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import RootNavigation from "./navigation/RootNavigation";
import Toast from "react-native-toast-message";
import "./global.css";
import "./i18n";

function AppContent() {
  const { theme } = useTheme();
  const { setColorScheme } = useNativewindColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return (
    <>
      <StatusBar style={"dark"} />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toast />
    </ThemeProvider>
  );
}