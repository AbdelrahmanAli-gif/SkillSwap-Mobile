import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useUnreadCount } from '../hooks/useUnreadCount';
import { theme } from '../theme';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import DrawerContent from '../components/DrawerContent';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Tabs = () => {
    const unreadCount = useUnreadCount();
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MaterialIcons
                            name="settings"
                            size={24}
                            color={theme.colors.main}
                            style={{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
                ),
                headerStyle: { backgroundColor: '#20201c' },
                headerShadowVisible: false,
                headerTitleStyle: { color: theme.colors.main },
                tabBarStyle: { backgroundColor: '#20201c' },
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Matches') iconName = 'favorite';
                    else if (route.name === 'Messages') iconName = 'message';
                    else if (route.name === 'Search') iconName = 'search';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
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
};

const AppNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: { backgroundColor: '#20201c', width: 260 },
                headerShown: false,
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="MainTabs" component={Tabs} />
        </Drawer.Navigator>
    );
};

export default AppNavigation;
