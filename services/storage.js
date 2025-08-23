import AsyncStorage from '@react-native-async-storage/async-storage';
export const THEME_KEY = 'preferredTheme';
export const USER_KEY = 'currentUser';

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.log('AsyncStorage setItem error:', e);
    }
};

export const getItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    }
    catch (e) {
        console.log('AsyncStorage getItem error:', e); return null;
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch (e) {
        console.log('AsyncStorage removeItem error:', e);
    }
};
