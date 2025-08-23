import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from "../contexts/ThemeContext";

export default function GradientBackground() {
    const { theme } = useTheme();
    return (
        <LinearGradient
            colors={theme === 'dark' ? ['#1a1a17', '#1a1a17', '#1a1a17'] : ['#f4f2ee', '#f4f2ee', '#f4f2ee']}
            locations={[0, 0.4, 1]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
        />
    );
}