import { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import AuthForm from '../components/AuthForm';
import { useTranslation } from 'react-i18next';

const { email, password } = authValidationRules;
const rules = { email, password };

const LoginScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const inputs = [
        { id: "email", placeholder: t("email"), keyboardType: "email-address" },
        { id: "password", placeholder: t("password"), secureTextEntry: true }
    ]

    const handleLogin = async ({ email, password }) => {
        setError(null);
        try {
            await login(email, password);
            navigation.navigate("App");
        } catch (error) {
            console.log(error);
            setError("Invalid email or password");
        }
    }

    return (
        <View className="flex-1 items-center bg-white pt-5">
            <Text className="text-2xl font-bold">
                {t("LoginScreen.title")}
            </Text>
            <AuthForm inputs={inputs} buttonText={t("LoginScreen.login")} onSubmit={handleLogin} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4">
                    {t("LoginScreen.dontHaveAccount")} <Text onPress={() => navigation.navigate("Register")} className="text-[#3D99F5]">{t("LoginScreen.register")}</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default LoginScreen;
