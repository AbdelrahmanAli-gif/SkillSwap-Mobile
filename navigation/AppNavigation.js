import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import { useUnreadCount } from '../hooks/useUnreadCount';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const navigation = useNavigation();
    const unreadCount = useUnreadCount();

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
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: "center",
                headerRight: () => (
                    <MaterialIcons
                        onPress={handleLogout}
                        name="logout"
                        size={24}
                        color={theme.colors.main}
                        style={{ marginRight: 15 }}
                    />
                ),
                headerStyle: { backgroundColor: "#20201c" },
                headerTitleStyle: { color: theme.colors.main, },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Matches') iconName = 'favorite';
                    else if (route.name === 'Messages') iconName = 'message';
                    else if (route.name === 'Search') iconName = 'search';

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: { backgroundColor: '#20201c' },
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={LandingScreen} />
            <Tab.Screen name="Matches" component={MatchesScreen} />
            <Tab.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                }}
            />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>

    );
}

export default AppNavigation;