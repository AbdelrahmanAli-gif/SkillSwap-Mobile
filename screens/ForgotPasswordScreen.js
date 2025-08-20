import { Text, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { authValidationRules } from '../utils/authValidationRules';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import AuthForm from '../components/AuthForm';
import GradientBackground from '../components/GradientBackground';
import Toast from 'react-native-toast-message';

const { email, password } = authValidationRules;
const rules = { email, password };

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const inputs = [
        { id: "email", placeholder: t("email"), keyboardType: "email-address" },
    ];

    const handleResetPassword = async ({ email }) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
            Toast.show({
                text1: "Success",
                text2: t("feedback.resetPasswordSuccess"),
            });
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: "error",
                text2: t("feedback.resetPasswordFailed"),
            });
        }
    }

    return (
        <View className="flex-1 items-center pt-5">
            <GradientBackground />
            <Text className="text-2xl font-bold text-main-color-light dark:text-main-color-dark">
                {t("ForgotPasswordScreen.title")}
            </Text>
            <AuthForm inputs={inputs} buttonText={t("ForgotPasswordScreen.resetPassword")} onSubmit={handleResetPassword} validationRules={rules} submitError={error} showGoogle={false}>
                <Text className="text-lg font-bold text-center mt-4 text-text-secondary-light dark:text-text-secondary-dark">
                    {t("ForgotPasswordScreen.backTo")} <Text onPress={() => navigation.navigate("Login")} className="text-text-primary-light dark:text-text-primary-dark">{t("ForgotPasswordScreen.login")}</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default ForgotPasswordScreen;
