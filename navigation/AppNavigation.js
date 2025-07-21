import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import MessagesScreen from '../screens/MessagesScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await logout();
            Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
            });
        }
    };

    return (
        <Tab.Navigator screenOptions={{
            headerTitleAlign: "center",
            headerRight: () => <MaterialIcons onPress={handleLogout} name="logout" size={24} color="black" />
        }}>
            <Tab.Screen name='Messages' component={MessagesScreen}/>
            <Tab.Screen name="Home" component={LandingScreen} />
            <Tab.Screen name="Matches" component={MatchesScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigation;