import { Text, TouchableOpacity } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import AppNavigation from "./AppNavigation"
import CompleteProfileScreen from "../screens/CompleteProfileScreen"
import ChatScreen from "../screens/ChatScreen"
import ScheduleSessionsScreen from "../screens/ScheduleSessionsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import MilestoneScreen from "../screens/MilestoneScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const { i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme();
  const colors = themeColors(theme);

  const switchLang = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    await i18n.changeLanguage(newLang)
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          title: "Swapoo",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerStyle: { backgroundColor: colors.colors.navigationBackground },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.colors.main, },
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme}>
              <Text style={{ color: colors.colors.main, marginRight: 10 }}>
                {theme === "dark" ? "Light" : "Dark"}
              </Text>
            </TouchableOpacity>
            // <TouchableOpacity onPress={() => { }}>
            //   <Text style={{ color: theme.colors.main, marginRight: 10 }}>
            //     {i18n.language === "en" ? "Arabic" : "الإنجليزية"}
            //   </Text>
            // </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="Complete Profile" component={CompleteProfileScreen} />
        <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ScheduleSession" component={ScheduleSessionsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Milestones" component={MilestoneScreen} />
      </Stack.Navigator>
    </>
  )
}

export default RootNavigation
