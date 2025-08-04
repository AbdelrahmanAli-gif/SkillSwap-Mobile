import { Text, TouchableOpacity } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { AuthProvider } from "../contexts/AuthContext"
import { theme } from "../theme"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import AppNavigation from "./AppNavigation"
import CompleteProfileScreen from "../screens/CompleteProfileScreen"
import ChatScreen from "../screens/ChatScreen"
import ScheduleSessionsScreen from "../screens/ScheduleSessionsScreen"

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const { i18n } = useTranslation()

  const switchLang = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    await i18n.changeLanguage(newLang)
  }

  return (
    <>
      <AuthProvider AuthProvider >
        <Stack.Navigator
          screenOptions={{
            title: "Swapoo",
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerStyle: { backgroundColor: "#20201c" },
            headerShadowVisible: false,
            headerTitleStyle: { color: theme.colors.main, },
            headerRight: () => (
              <TouchableOpacity onPress={switchLang}>
                <Text style={{ color: theme.colors.main, marginRight: 10 }}>
                  {i18n.language === "en" ? "Arabic" : "الإنجليزية"}
                </Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Complete Profile" component={CompleteProfileScreen} />
          <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ScheduleSession" component={ScheduleSessionsScreen} />
        </Stack.Navigator>
      </AuthProvider >
    </>
  )
}

export default RootNavigation
