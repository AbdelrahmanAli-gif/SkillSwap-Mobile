import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground() {
    return (
        <LinearGradient
            colors={['#1a1a17', '#1a1a17', '#1a1a17']}
            locations={[0, 0.4, 1]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
        />
    );
}