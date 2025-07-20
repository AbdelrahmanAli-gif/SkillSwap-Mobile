import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import Toast from 'react-native-toast-message';

const AppScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await logout();
            Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
            });
        }
    };

    return (
        <View>
            <Text>AppScreen</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AppScreen;
