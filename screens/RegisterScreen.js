import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

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
                text1: 'Registration Successful',
            });
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
            setError("Email already in use");
        }
    };

    return (
        <View className="flex-1 items-center bg-white pt-5">
            <Text className="text-2xl font-bold">
                {t("RegisterScreen.title")}
            </Text>
            <AuthForm inputs={inputs} buttonText={t("RegisterScreen.register")} onSubmit={handleRegister} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4">
                    {t("RegisterScreen.alreadyHaveAccount")} <Text onPress={() => navigation.navigate("Login")} className="text-[#3D99F5]">{t("RegisterScreen.login")}</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default RegisterScreen;
