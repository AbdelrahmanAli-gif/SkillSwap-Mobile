import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, FlatList, Modal,
} from 'react-native';

const PhoneInput = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCode, setSelectedCode] = useState('+1'); // default
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchDialCodes = async () => {
            try {
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/codes');
                const data = await res.json();
                setCountries(data.data);
            } catch (error) {
                console.error('Failed to fetch country codes:', error);
            }
        };

        fetchDialCodes();
    }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View className="px-4 py-2">
            <View className="flex-row items-center bg-gray-200 rounded-lg overflow-hidden">
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="px-4 py-3 bg-gray-300"
                >
                    <Text>{selectedCode}</Text>
                </TouchableOpacity>
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    className="flex-1 px-4 py-3"
                />
            </View>

            {/* Modal for selecting country code */}
            <Modal visible={modalVisible} animationType="slide">
                <View className="flex-1 p-4 bg-white">
                    <Text className="text-xl font-bold mb-4">Select your country</Text>
                    <TextInput
                        placeholder="Search country"
                        className="p-3 border rounded mb-4"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="py-3 border-b"
                                onPress={() => {
                                    setSelectedCode(item.dial_code);
                                    setModalVisible(false);
                                }}
                            >
                                <Text>{item.name} ({item.dial_code})</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        className="mt-4 p-3 bg-red-500 rounded"
                        onPress={() => setModalVisible(false)}
                    >
                        <Text className="text-white text-center">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default PhoneInput;
