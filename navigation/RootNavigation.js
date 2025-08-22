import { createNativeStackNavigator } from "@react-navigation/native-stack"
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
import SearchScreen from "../screens/SearchScreen";
import Plans from "../screens/Plans";
import ReviewUserScreen from "../screens/ReviewUserScreen";

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const { theme } = useTheme();
  const colors = themeColors(theme);

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
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Complete Profile" component={CompleteProfileScreen} />
        <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ScheduleSession" component={ScheduleSessionsScreen} />
        <Stack.Screen name="Milestones" component={MilestoneScreen} />
        <Stack.Screen name="Plans" component={Plans} />
        <Stack.Screen name="Review" component={ReviewUserScreen} />
      </Stack.Navigator>
    </>
  )
}

export default RootNavigation
