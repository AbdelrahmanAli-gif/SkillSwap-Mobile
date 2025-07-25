import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserChats } from '../utils/chatUtils';
import Messages from '../components/Messages';

const MessagesScreen = () => {
    const [isClicked, setIsClicked] = useState("All");
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

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
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 p-4">
            <View className="ml-3">
                <Text className="font-bold text-3xl">Messages</Text>
            </View>

            <View className="m-3">
                <Text className="font-light text-gray-700">Communicate with potential matches, discuss details of the skill exchange, and schedule sessions. </Text>
            </View>

            <View className="w-full m-2 h-12 flex-row border-b-[1px] border-b-slate-500">
                <TouchableOpacity onPress={() => { setIsClicked("All") }}
                    className={isClicked == "All" ? "ml-4 mr-6 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-6 h-full items-center justify-center"}>
                    <Text className="font-bold text-lg">All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsClicked("Unread") }}
                    className={isClicked == "Unread" ? " ml-4 mr-6 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-6 h-full items-center justify-center "}>
                    <Text className="font-bold text-lg">Unread</Text>
                </TouchableOpacity>
            </View>

            {
                isClicked == "All" ? (<ScrollView className="flex-1">
                    {
                        chats.map((chat) => {
                            return <Messages key={chat.id} chat={chat} />
                        })
                    }
                </ScrollView>) : (
                    <ScrollView className="flex-1">
                        {
                            chats.map((chat) => {
                                if (chat.Status == "Unread")
                                    return <Messages key={chat.id} chat={chat} />
                                return
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    );
}

export default MessagesScreen;
