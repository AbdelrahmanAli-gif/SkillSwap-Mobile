import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../utils/firebaseAuth';
import AuthForm from '../components/AuthForm';

const inputs = [
    { id: "email", placeholder: "Email address", keyboardType: "email-address" },
    { id: "password", placeholder: "Password", secureTextEntry: true }
]

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleLogin = async ({ email, password }) => {
        try {
            await login(email, password);
            navigation.navigate("App");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className="flex-1 items-center bg-white pt-5">
            <Text className="text-2xl font-bold">
                Welcome to SkillSwap!
            </Text>
            <AuthForm inputs={inputs} buttonText="Login" onSubmit={handleLogin} />
            <Text className="text-lg font-bold">
                Don't have an account? <Text onPress={() => navigation.navigate("Register")} className="text-[#3D99F5]">Sign up</Text>
            </Text>
        </View>
    );
}

export default LoginScreen;
