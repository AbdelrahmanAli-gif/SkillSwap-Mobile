import { Button, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const { i18n } = useTranslation();

    const switchLang = async () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        await i18n.changeLanguage(newLang);
    };

    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <Button
                title={i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
                onPress={switchLang}
            />
            <AuthProvider>
                <Stack.Navigator screenOptions={{ title: "SkillSwap", headerTitleAlign: "center", headerBackVisible: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} />
                </Stack.Navigator>
            </AuthProvider>
        </View>
    );
}

export default RootNavigation;
