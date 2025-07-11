import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppScreen from '../screens/AppScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ title: "Skill Swap", headerTitleAlign: "center", headerBackVisible: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="App" component={AppScreen} />
        </Stack.Navigator>
    );
}

export default RootNavigation;
