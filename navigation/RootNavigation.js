import { ActivityIndicator, Image, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import AppNavigation from "./AppNavigation"
import CompleteProfileScreen from "../screens/CompleteProfileScreen"
import ChatScreen from "../screens/ChatScreen"
import ScheduleSessionsScreen from "../screens/ScheduleSessionsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import MilestoneScreen from "../screens/MilestoneScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import PaymentSuccess from "../screens/PaymentSuccess";
import SearchScreen from "../screens/SearchScreen";
import Plans from "../screens/Plans";
import ReviewUserScreen from "../screens/ReviewUserScreen";
import GradientBackground from "../components/GradientBackground";

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const colors = themeColors(theme);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <GradientBackground />
        <ActivityIndicator size="large" color={colors.colors.main} />
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: () => (
            <View className="flex-row items-center justify-center mt-[30px] py-4" style={{ backgroundColor: colors.colors.navigationBackground }}>
              <Image
                source={require("../assets/images/logo.png")}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold ml-2 text-main-color-light dark:text-main-color-dark">Swapoo</Text>
            </View>
          ),
          headerBackVisible: false,
          headerShadowVisible: false,
          headerShown: false
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
            <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
          </>
        )}
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Complete Profile" component={CompleteProfileScreen} />
        {/* <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} /> */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ScheduleSession" component={ScheduleSessionsScreen} />
        <Stack.Screen name="Milestones" component={MilestoneScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess}></Stack.Screen>
        <Stack.Screen name="Plans" component={Plans} />
        <Stack.Screen name="Review" component={ReviewUserScreen} />
      </Stack.Navigator>
    </>
  )
}

export default RootNavigation
