import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUnreadMessages } from '../hooks/useUnreadMessages';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from 'react-i18next';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { useUnreadRequests } from '../hooks/useUnreadRequests';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const unreadMessages = useUnreadMessages();
    const unreadRequests = useUnreadRequests();
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: colors.colors.navigationBackground },
                headerShadowVisible: false,
                headerTitleStyle: { color: colors.colors.main },
                tabBarStyle: { backgroundColor: colors.colors.navigationBackground },
                headerShown: false,
                tabBarActiveTintColor: colors.colors.main,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === t("pages.home")) iconName = 'home';
                    else if (route.name === t("pages.matches")) iconName = 'explore';
                    else if (route.name === t("pages.messages")) iconName = 'message';
                    else if (route.name === t("pages.notifications")) iconName = 'notifications';
                    else if (route.name === t("pages.settings")) iconName = 'settings';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name={t("pages.home")} component={LandingScreen} />
            <Tab.Screen name={t("pages.matches")} component={MatchesScreen} />
            <Tab.Screen
                name={t("pages.messages")}
                component={MessagesScreen}
                options={{
                    tabBarBadge: unreadMessages > 0 ? unreadMessages : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                }}
            />
            <Tab.Screen
                name={t("pages.notifications")}
                component={NotificationsScreen}
                options={{
                    tabBarBadge: unreadRequests > 0 ? unreadRequests : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: "red",
                        color: "white",
                    },
                }}
            />
            <Tab.Screen name={t("pages.settings")} component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigation;
