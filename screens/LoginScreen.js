import { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import AuthForm from '../components/AuthForm';

const inputs = [
    { id: "email", placeholder: "Email address", keyboardType: "email-address" },
    { id: "password", placeholder: "Password", secureTextEntry: true }
]

const { email, password } = authValidationRules;
const rules = { email, password };

const LoginScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);

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
                Welcome to SkillSwap!
            </Text>
            <AuthForm inputs={inputs} buttonText="Login" onSubmit={handleLogin} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4">
                    Don't have an account? <Text onPress={() => navigation.navigate("Register")} className="text-[#3D99F5]">Sign up</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default LoginScreen;
