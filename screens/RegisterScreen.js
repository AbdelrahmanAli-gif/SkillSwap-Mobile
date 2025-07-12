import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../utils/firebaseEmailAndPasswordAuth';
import { authValidationRules } from '../utils/authValidationRules';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const inputs = [
    { id: "name", placeholder: "Name" },
    { id: "email", placeholder: "Email address", keyboardType: "email-address" },
    { id: "password", placeholder: "Password", secureTextEntry: true },
    { id: "confirm-password", placeholder: "Confirm password", secureTextEntry: true }
]

const { name, email, password, 'confirm-password': confirmPassword } = authValidationRules;
const rules = { name, email, password, 'confirm-password': confirmPassword };

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);

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
                Join our community!
            </Text>
            <AuthForm inputs={inputs} buttonText="Sign Up" onSubmit={handleRegister} validationRules={rules} submitError={error}>
                <Text className="text-lg font-bold text-center mt-4">
                    Already have an account? <Text onPress={() => navigation.navigate("Login")} className="text-[#3D99F5]">Login</Text>
                </Text>
            </AuthForm>
        </View>
    );
}

export default RegisterScreen;
