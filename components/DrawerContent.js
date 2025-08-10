import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import Toast from 'react-native-toast-message';

const DrawerContent = (props) => {
    const { navigation } = props;
    const { i18n } = useTranslation();
    const { user } = useAuth();
    const { toggleTheme } = useTheme();

    const switchLang = async () => {
        const newLang = i18n.language === "en" ? "ar" : "en"
        await i18n.changeLanguage(newLang)
        navigation.closeDrawer();
    }

    const handleLogout = async () => {
        try {
            await logout();
            Toast.show({ type: 'success', text1: 'Logged out successfully' });
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Logout failed' });
        }
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }} className="bg-zinc-900 text-white">
            <View className="items-center mt-6">
                <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                    {user.profilePicture ?
                        <Image className="w-16 h-16 rounded-full" source={{ uri: user.profilePicture }} />
                        : <Text className="text-2xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
                </View>
                <Text className="text-text-primary-light dark:text-text-primary-dark text-lg font-semibold mt-2">{user.name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })} className="p-4 border-b border-zinc-700">
                <Text className="text-text-secondary-light dark:text-text-secondary-dark text-base">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={switchLang} className="p-4 border-b border-zinc-700">
                <Text className="text-text-secondary-light dark:text-text-secondary-dark text-base">Change Language</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleTheme} className="p-4 border-b border-zinc-700">
                <Text className="text-text-secondary-light dark:text-text-secondary-dark text-base">Change Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} className="p-4 border-b border-zinc-700">
                <Text className="text-text-secondary-light dark:text-text-secondary-dark text-base">Logout</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

export default DrawerContent;
