import { Button, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { AuthProvider } from "../contexts/AuthContext"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import AppNavigation from "./AppNavigation"
import MessagesScreen from "../screens/MessagesScreen"
import PictureBio from "../screens/RegisterSteps/PictureBio"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const { i18n } = useTranslation()

  const switchLang = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    await i18n.changeLanguage(newLang)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title={i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        onPress={switchLang}
      />
      <AuthProvider>
        <Stack.Navigator
          screenOptions={{
            title: "SkillSwap",
            headerTitleAlign: "center",
            headerBackVisible: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name='Messages' component={MessagesScreen}></Stack.Screen>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
          <Stack.Screen
            name="PictureBio"
            component={PictureBio}
            options={{
              title: "Tell us about yourself",
              headerBackVisible: true,
              headerLeft: () => <Icon name="arrow-back" size={24} color="black"></Icon>,
            }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </SafeAreaView>
  )
}

export default RootNavigation
