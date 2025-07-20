import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';
import MatchesScreen from '../screens/MatchesScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
            <Tab.Screen name="Home" component={LandingScreen} />
            <Tab.Screen name="Matches" component={MatchesScreen} />
        </Tab.Navigator>
    );
}

export default AppNavigation;