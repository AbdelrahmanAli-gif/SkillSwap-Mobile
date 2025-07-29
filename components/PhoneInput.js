import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';

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
        <View className="px-4 py-2">
            <View className="flex-row items-center bg-input-bg rounded-lg overflow-hidden">
                <TouchableOpacity
                    className="px-3 py-3 bg-black/35"
                    onPress={() => setShowDropdown(!showDropdown)}
                >
                    <Text className="text-lg text-text-primary">
                        {getFlagEmoji(selectedCountry.code)} {selectedCountry.dial_code}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    value={value.replace(/^\+\d+\s?/, '')}
                    onChangeText={handlePhoneChange}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    className="flex-1 px-4 py-3 text-text-primary"
                    placeholderTextColor={theme.colors.textSecondary}
                />
            </View>

            {showDropdown && (
                <View className="mt-2 bg-white rounded-lg border max-h-60">
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search country"
                        className="p-3 border-b"
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
