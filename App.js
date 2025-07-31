import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import Toast from "react-native-toast-message";
import "./global.css";
import "./i18n";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}
