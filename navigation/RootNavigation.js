import { Text, TouchableOpacity } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { AuthProvider } from "../contexts/AuthContext"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import AppNavigation from "./AppNavigation"
import CompleteProfileScreen from "../screens/CompleteProfileScreen"

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
            title: "SkillSwap",
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={switchLang}>
                <Text>{i18n.language === "en" ? "Arabic" : "الإنجليزية"}</Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Complete Profile" component={CompleteProfileScreen} />
          <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
        </Stack.Navigator>
      </AuthProvider >
    </>
  )
}

export default RootNavigation
