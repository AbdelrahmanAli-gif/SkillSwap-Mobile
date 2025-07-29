import { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, } from 'react-native';

const LocationInput = ({ value, onChange }) => {
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries');
            const data = await response.json();
            const list = [];
            data.data.forEach(item =>
                item.cities.forEach(city =>
                    list.push({ city, country: item.country })
                )
            );
            setLocations(list);
        };
        fetchData();
    }, []);

    const handleChange = (text) => {
        onChange(text);
        const lowerText = text.toLowerCase();
        const matches = locations.filter(loc =>
            loc.city.toLowerCase().startsWith(lowerText) ||
            loc.country.toLowerCase().startsWith(lowerText)
        );
        setFilteredLocations(matches.slice(0, 20));
        setShowDropdown(!!text);
    };

    const handleSelect = (loc) => {
        const selected = `${loc.city}, ${loc.country}`;
        onChange(selected);
        setShowDropdown(false);
    };

    return (
        <View className="px-4 relative">
            <TextInput
                value={value}
                onChangeText={handleChange}
                placeholder="Enter city or country"
                className="py-4 px-4 rounded-lg bg-input-bg text-text-primary placeholder:text-text-secondary"
            />
            {showDropdown && filteredLocations.length > 0 && (
                <View className="bg-white mt-2 rounded-lg max-h-60 border border-gray-300">
                    <ScrollView className="max-h-48">
                        {filteredLocations.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                                <Text className="p-2 border-b border-gray-100">
                                    {`${item.city}, ${item.country}`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default LocationInput;
