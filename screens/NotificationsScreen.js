import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserRequests } from '../utils/requestsUtils';
import GradientBackground from '../components/GradientBackground';

const NotificationsScreen = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToUserRequests(user.uid, (fetchedRequests) => {
            setRequests(fetchedRequests);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user.uid]);

    if (loading) return (
        <View className="flex-1 items-center justify-center">
            <Text>Loading...</Text>
        </View>
    )

    return (
        <View className="flex-1 mt-[30px]">
            <GradientBackground />
            <Text>Notifications</Text>
            <Text>{requests.length}</Text>
        </View>
    );
}

export default NotificationsScreen;
