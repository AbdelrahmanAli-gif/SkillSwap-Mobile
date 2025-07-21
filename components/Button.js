import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text }) => {
    return (
        <TouchableOpacity className="bg-gray-200 px-3 py-1 rounded-lg self-start">
            <Text className="text-gray-800 text-sm font-medium">{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;