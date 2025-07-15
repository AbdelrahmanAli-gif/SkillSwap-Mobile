import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import Toast from "react-native-toast-message";
import "./global.css";
import "./i18n";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}
