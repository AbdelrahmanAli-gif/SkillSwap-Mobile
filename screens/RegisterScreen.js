import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../utils/firebaseAuth';
import AuthForm from '../components/AuthForm';

const inputs = [
    { id: "name", placeholder: "Name" },
    { id: "email", placeholder: "Email address", keyboardType: "email-address" },
    { id: "password", placeholder: "Password", secureTextEntry: true },
    { id: "confirm-password", placeholder: "Confirm password", secureTextEntry: true }
]

const RegisterScreen = () => {
    const navigation = useNavigation();

    const handleRegister = async ({ email, password, name }) => {
        try {
            await register(email, password, name);
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex-1 items-center bg-white pt-5">
            <Text className="text-2xl font-bold">
                Join our community!
            </Text>
            <AuthForm inputs={inputs} buttonText="Sign Up" onSubmit={handleRegister} />
            <Text className="text-lg font-bold">
                Already have an account? <Text onPress={() => navigation.navigate("Login")} className="text-[#3D99F5]">Login</Text>
            </Text>
        </View>
    );
}

export default RegisterScreen;
