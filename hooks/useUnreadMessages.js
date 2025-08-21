import { useEffect, useState } from "react";
import { subscribeToUserChats, getUnreadCount } from "../utils/chatUtils";
import { useAuth } from "../contexts/AuthContext";

export const useUnreadMessages = () => {
    const [totalUnread, setTotalUnread] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.uid) return;

        const unsubscribe = subscribeToUserChats(user.uid, (chats) => {
            const count = chats.reduce((sum, chat) => {
                return sum + getUnreadCount(chat, user.uid);
            }, 0);
            setTotalUnread(count);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    return totalUnread;
};
