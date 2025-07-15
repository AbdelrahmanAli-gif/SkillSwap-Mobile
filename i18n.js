import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

const getDeviceLanguage = () => {
    const locales = Localization.getLocales();
    return locales.length > 0 ? locales[0].languageCode : 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getDeviceLanguage(),
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
