import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text }) => {
    return (
        <TouchableOpacity className="bg-btn-submit-bg px-3 py-1 rounded-lg self-start">
            <Text className="text-text-light text-sm font-medium">{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;