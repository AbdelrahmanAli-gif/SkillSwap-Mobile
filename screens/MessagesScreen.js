import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getUnreadCount, subscribeToUserChats } from '../utils/chatUtils';
import { useTranslation } from 'react-i18next';
import Messages from '../components/Messages';
import GradientBackground from '../components/GradientBackground';

const MessagesScreen = () => {
    const [isClicked, setIsClicked] = useState("All");
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const unreadChats = chats.filter((chat) => getUnreadCount(chat, user.uid) > 0);

    useEffect(() => {
        const unsubscribe = subscribeToUserChats(user.uid, (fetchedChats) => {
            setChats(fetchedChats);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>{t("MessagesScreen.loading")}</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 p-4" style={{ direction: isRTL ? 'rtl' : 'ltr', marginTop: 30 }}>
            <GradientBackground />
            <View className="ml-3">
                <Text className="font-bold text-3xl text-main-color-light dark:text-main-color-dark">{t("MessagesScreen.title")}</Text>
            </View>

            <View className="m-3">
                <Text className="font-medium text-text-secondary-light dark:text-text-secondary-dark">{t("MessagesScreen.description")}</Text>
            </View>

            <View className="w-full h-12 flex-row border-b-[1px] border-b-slate-500">
                <TouchableOpacity onPress={() => { setIsClicked("All") }}
                    className={isClicked == "All" ? "ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center"}>
                    <Text className={`font-bold text-lg ${isClicked == "All" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>{t("MessagesScreen.all")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsClicked("Unread") }}
                    className={isClicked == "Unread" ? " ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center "}>
                    <Text className={`font-bold text-lg ${isClicked == "Unread" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>{t("MessagesScreen.unread")}</Text>
                </TouchableOpacity>
            </View>

            {
                isClicked == "All" ? (
                    <ScrollView className="flex-1">
                        {chats.length === 0 ? <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center pt-4">{t("MessagesScreen.noChats")}</Text> :
                            chats.map((chat) => {
                                return <Messages key={chat.id} chat={chat} unreadCount={getUnreadCount(chat, user.uid)} />
                            })
                        }
                    </ScrollView>) : (
                    <ScrollView className="flex-1">
                        {unreadChats.length === 0 ? <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center pt-4">{t("MessagesScreen.noChats")}</Text> :
                            unreadChats.map((chat) => {
                                return <Messages key={chat.id} chat={chat} unreadCount={getUnreadCount(chat, user.uid)} />
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    );
}

export default MessagesScreen;
