import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppScreen from '../screens/AppScreen';
import Landing from '../screens/Landing';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ title: "SkillSwap", headerTitleAlign: "center", headerBackVisible: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="App" component={AppScreen} />
        </Stack.Navigator>
    );
}

export default RootNavigation;
