import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthForm from '../components/AuthForm';
import Toast from 'react-native-toast-message';
import GradientBackground from '../components/GradientBackground';

const { name, email, password, 'confirm-password': confirmPassword } = authValidationRules;
const rules = { name, email, password, 'confirm-password': confirmPassword };

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const inputs = [
        { id: "name", placeholder: t("name") },
        { id: "email", placeholder: t("email"), keyboardType: "email-address" },
        { id: "password", placeholder: t("password"), secureTextEntry: true },
        { id: "confirm-password", placeholder: t("confirm-password"), secureTextEntry: true }
    ]

    const handleRegister = async ({ email, password, name }) => {
        setError(null);
        try {
            await register(email, password, name);
            Toast.show({
                type: 'success',
                text1: t("feedback.registerSuccess"),
            });
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
            setError("Email already in use");
        }
    };

    return (
        <View className="flex-1 items-center pt-5">
            <GradientBackground />
            <Text className="text-2xl font-bold text-main-color-light dark:text-main-color-dark">
                {t("RegisterScreen.title")}
            </Text>
            <AuthForm inputs={inputs} buttonText={t("RegisterScreen.register")} onSubmit={handleRegister} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4 text-text-secondary-light dark:text-text-secondary-dark">
                    {t("RegisterScreen.alreadyHaveAccount")} <Text onPress={() => navigation.navigate("Login")} className="text-text-primary-light dark:text-text-primary-dark">{t("RegisterScreen.login")}</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default RegisterScreen;
