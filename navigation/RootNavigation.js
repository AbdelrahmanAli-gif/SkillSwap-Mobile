import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppScreen from '../screens/AppScreen';
import Landing from '../screens/Landing';
import { Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const { i18n, t } = useTranslation();

    const switchLang = async () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        await i18n.changeLanguage(newLang); // triggers direction logic in App.js
    };

    return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <Button
                title={i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
                onPress={switchLang}
            />
            <Stack.Navigator screenOptions={{ title: "SkillSwap", headerTitleAlign: "center", headerBackVisible: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="App" component={AppScreen} />
            </Stack.Navigator>
        </View>
    );
}

export default RootNavigation;
