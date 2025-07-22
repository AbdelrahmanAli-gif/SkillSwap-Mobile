import { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const LocationInput = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    console.log(countries);

    // Fetch all countries once
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries');
                const data = await response.json();
                if (data && data.data) {
                    const countryNames = data.data.map(item => item.country);
                    setCountries(countryNames);
                }
            } catch (err) {
                console.error('Failed to fetch countries:', err);
            }
        };
        fetchCountries();
    }, []);

    // Filter countries based on input
    const handleChange = (text) => {
        setInput(text);
        if (text.length > 0) {
            const matches = countries.filter((country) =>
                country.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCountries(matches);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    // When a user selects a country
    const handleSelect = (country) => {
        setInput(country);
        setShowDropdown(false);
    };

    return (
        <View className="px-4 relative">
            <TextInput
                value={input}
                onChangeText={handleChange}
                placeholder="Location"
                className="p-2 px-4 rounded-lg bg-gray-200"
            />
            {showDropdown && filteredCountries.length > 0 && (
                <View className="bg-white mt-2 rounded-lg max-h-40 border border-gray-300">
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelect(item)}>
                                <Text className="p-2 border-b border-gray-200">{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default LocationInput;
