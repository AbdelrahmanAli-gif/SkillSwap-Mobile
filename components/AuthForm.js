import { useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const AuthForm = ({ inputs, buttonText, onSubmit }) => {
    const inputRefs = useRef({});


    const handleInputChange = (id, value) => {
        inputRefs.current[id] = value;
    }

    const handleSubmit = () => {
        onSubmit(inputRefs.current);
    }

    return (
        <View className="w-full p-5 mb-4">
            {inputs.map((input) => (
                <TextInput
                    className="rounded-lg bg-[#E8EDF5] p-5 mb-5 h-[50px]"
                    key={input.id}
                    {...input}
                    onChangeText={(value) => handleInputChange(input.id, value)}
                />
            ))}
            <TouchableOpacity className="bg-[#3D99F5] rounded-lg h-[50px] flex items-center justify-center" onPress={handleSubmit}>
                <Text className="text-lg font-bold text-white">{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AuthForm;
