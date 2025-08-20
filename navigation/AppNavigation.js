import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUnreadCount } from '../hooks/useUnreadCount';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from 'react-i18next';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SettingsScreen from '../screens/SettingsScreen';
import Plans from '../screens/Plans';
import MilestoneScreen from '../screens/MilestoneScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    const unreadCount = useUnreadCount();
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
                    else if (route.name === t("pages.matches")) iconName = 'favorite';
                    else if (route.name === t("pages.messages")) iconName = 'message';
                    else if (route.name === t("pages.search")) iconName = 'search';
                    else if (route.name === t("pages.settings")) iconName = 'settings';
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Plans" component={Plans} />
            <Tab.Screen name="Milestones" component={MilestoneScreen} />
            <Tab.Screen name={t("pages.home")} component={LandingScreen} />
            <Tab.Screen name={t("pages.matches")} component={MatchesScreen} />
            <Tab.Screen
                name={t("pages.messages")}
                component={MessagesScreen}
                options={{
                    tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                }}
            />
            <Tab.Screen name={t("pages.search")} component={SearchScreen} />
            <Tab.Screen name={t("pages.settings")} component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigation;
