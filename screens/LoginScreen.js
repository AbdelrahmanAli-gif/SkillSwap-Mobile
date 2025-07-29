import { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { login } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';
import GradientBackground from '../components/GradientBackground';

const { email, password } = authValidationRules;
const rules = { email, password };

const LoginScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const { setUser } = useAuth();
    const { t } = useTranslation();

    const inputs = [
        { id: "email", placeholder: t("email"), keyboardType: "email-address" },
        { id: "password", placeholder: t("password"), secureTextEntry: true }
    ]

    const handleLogin = async ({ email, password }) => {
        setError(null);
        try {
            const userCredentials = await login(email, password);
            const user = userCredentials.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            setUser({ uid: user.uid, ...userDoc.data() });
            if (userDoc.data().bio === null) navigation.navigate('Complete Profile');
            else navigation.navigate("App");
        } catch (error) {
            console.log(error);
            setError("Invalid email or password");
        }
    }

    return (
        <View className="flex-1 items-center pt-5">
            <GradientBackground />
            <Text className="text-2xl font-bold text-text-primary">
                {t("LoginScreen.title")}
            </Text>
            <AuthForm inputs={inputs} buttonText={t("LoginScreen.login")} onSubmit={handleLogin} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4 text-text-secondary">
                    {t("LoginScreen.dontHaveAccount")} <Text onPress={() => navigation.navigate("Register")} className="text-text-primary">{t("LoginScreen.register")}</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default LoginScreen;
