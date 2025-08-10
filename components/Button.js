import { Text, TouchableOpacity } from 'react-native';

const Button = ({ text }) => {
    return (
        <TouchableOpacity className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark px-3 py-1 rounded-lg self-start">
            <Text className="text-text-light-light dark:text-text-light-dark text-sm font-medium">{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;