import { FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserRequests } from '../utils/requestsUtils';
import { useTranslation } from 'react-i18next';
import GradientBackground from '../components/GradientBackground';
import TradeRequestCard from '../components/TradeRequestCard';

const NotificationsScreen = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    useEffect(() => {
        const unsubscribe = subscribeToUserRequests(user.uid, (fetchedRequests) => {
            setRequests(fetchedRequests);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user.uid]);

    return (
        <View className="flex-1 mt-[30px] px-5 py-5" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <GradientBackground />
            <Text className="text-main-color-light dark:text-main-color-dark text-3xl font-bold ">{t("NotificationsScreen.title")}</Text>
            <View className="border-b border-slate-600" />
            {loading ?
                <View className="flex-1 items-center justify-center">
                    <Text>{t("NotificationsScreen.loading")}</Text>
                </View> :
                <FlatList className="flex-1 py-2"
                    data={requests}
                    renderItem={({ item }) => (
                        <TradeRequestCard request={item} />
                    )}
                    keyExtractor={(item) => item.requestId}
                    ListEmptyComponent={() => <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center mt-2">{t("NotificationsScreen.noNotifications")}</Text>}
                />
            }
        </View>
    );
}

export default NotificationsScreen;
