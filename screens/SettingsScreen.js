import { View, Text, Image, TouchableOpacity } from 'react-native';
import { theme as themeColors } from '../theme';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientBackground from '../components/GradientBackground';
import Toast from 'react-native-toast-message';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const SettingsScreen = () => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const colors = themeColors(theme);
    const isRTL = i18n.dir() === 'rtl';

    const switchLang = async () => {
        const newLang = i18n.language === "en" ? "ar" : "en"
        await i18n.changeLanguage(newLang)
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

    const settingsOptions = [
        { id: "profile", label: t('SettingsScreen.profile'), icon: <MaterialIcons name="person" size={24} color={colors.colors.main} />, action: () => navigation.navigate('Profile', { user }) },
        { id: "trades", label: "Trades", icon: <MaterialIcons name="notifications" size={24} color={colors.colors.main} />, action: () => navigation.navigate('Trades') },
        { id: "theme", label: t('SettingsScreen.theme'), icon: <MaterialIcons name={theme === 'dark' ? 'light-mode' : 'dark-mode'} size={24} color={colors.colors.main} />, action: toggleTheme },
        { id: "language", label: t('SettingsScreen.language'), icon: <MaterialIcons name="language" size={24} color={colors.colors.main} />, action: switchLang },
        { id: "logout", label: t('SettingsScreen.logout'), icon: <MaterialIcons name="logout" size={24} color={colors.colors.main} />, action: handleLogout },
    ];

    return (
        <View className="flex-1" style={{ direction: isRTL ? 'rtl' : 'ltr', marginTop: 30 }}>
            <GradientBackground />
            <View className="flex items-center justify-center py-2 px-4 rounded-xl mt-2">
                {user.profilePicture ?
                    <Image source={{ uri: user.profilePicture }} className="w-32 h-32 rounded-full" />
                    :
                    <View className="w-32 h-32 bg-amber-800 rounded-full items-center justify-center">
                        <Text className="text-4xl font-semibold text-white">{user.name.charAt(0).toUpperCase()}</Text>
                    </View>
                }
                <View className="flex-row items-center gap-2 mt-2">
                    <Text className="text-2xl font-bold mt-2 text-main-color-light dark:text-main-color-dark">{user.name}</Text>
                    {user.subscribtion?.plan === 'pro' && <FontAwesome6Icon name="certificate" size={16} color={colors.colors.main} className="mt-2"/>}
                </View>
            </View>

            <View className="mx-4 items-center justify-center">
                {settingsOptions.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={item.action}
                        className={`flex-row w-full items-center justify-center px-4 py-4 ${index !== settingsOptions.length - 1 ? 'border-b border-text-primary-light dark:border-text-primary-dark/10' : ''}`}
                    >
                        <View className="flex-row items-center w-full gap-4">
                            {item.icon}
                            <Text className="text-base text-text-primary-light dark:text-text-primary-dark">
                                {item.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default SettingsScreen;
