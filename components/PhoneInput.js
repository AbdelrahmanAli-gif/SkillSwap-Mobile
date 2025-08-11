import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from 'react-i18next';

const getFlagEmoji = (countryCode) =>
    countryCode
        ?.toUpperCase()
        .replace(/./g, (char) =>
            String.fromCodePoint(127397 + char.charCodeAt())
        );

const PhoneInput = ({ value, onChange }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        dial_code: '+20',
        code: 'EG',
        name: 'Egypt',
    });
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    useEffect(() => {
        const fetchCodes = async () => {
            const res = await fetch('https://countriesnow.space/api/v0.1/countries/codes');
            const data = await res.json();
            if (data?.data) {
                setCountries(data.data);
            }
        };
        fetchCodes();
    }, []);

    const handleSelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        setSearch('');

        const numericPart = value.replace(/^\+\d+\s?/, '');
        onChange(`${country.dial_code} ${numericPart}`);
    };

    const handlePhoneChange = (text) => {
        const clean = text.replace(/[^0-9]/g, '');
        onChange(`${selectedCountry.dial_code} ${clean}`);
    };

    return (
        <View className="px-4 py-2" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <View className="flex-row items-center bg-input-bg-light dark:bg-input-bg-dark rounded-lg overflow-hidden" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <TouchableOpacity
                    className="px-3 py-3 bg-black/35"
                    onPress={() => setShowDropdown(!showDropdown)}
                >
                    <Text className="text-lg text-text-primary-light dark:text-text-primary-dark">
                        {getFlagEmoji(selectedCountry.code)} {selectedCountry.dial_code}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    value={value.replace(/^\+\d+\s?/, '')}
                    onChangeText={handlePhoneChange}
                    placeholder={t("CompleteProfileScreen.phonePlaceholder")}
                    keyboardType="phone-pad"
                    className={`flex-1 px-4 py-3 text-text-primary-light dark:text-text-primary-dark ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholderTextColor={colors.colors.textSecondary}
                />
            </View>

            {showDropdown && (
                <View className="mt-2 bg-white rounded-lg border max-h-60">
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder={t("CompleteProfileScreen.countryPlaceholder")}
                        className={`p-3 border-b ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                    <ScrollView className="max-h-48">
                        {countries
                            .filter(c =>
                                c.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((item) => (
                                <TouchableOpacity
                                    key={item.code}
                                    className="px-3 py-2 border-b border-gray-100"
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text className="text-base">
                                        {getFlagEmoji(item.code)} {item.name} ({item.dial_code})
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default PhoneInput;
