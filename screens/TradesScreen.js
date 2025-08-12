import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserRequests, subscribeToUserTrades } from '../utils/tradesUtils';
import GradientBackground from '../components/GradientBackground';

const TradesScreen = () => {
    const [isClicked, setIsClicked] = useState("Requests");
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        if (!user?.uid) return;

        let unsubscribe;
        if (isClicked === "Requests") unsubscribe = subscribeToUserRequests(user.uid, setData);
        else unsubscribe = subscribeToUserTrades(user.uid, setData);

        return () => unsubscribe && unsubscribe();
    }, [isClicked, user?.uid]);

    const renderRequest = ({ item }) => (
        item.requestId &&
        <View className="flex-row items-center p-3 mt-3 rounded-lg bg-card-background-light dark:bg-gray-950/35">
            <View className="mr-3">
                {item.requestingUser.profilePicture ? (
                    <Image
                        className="rounded-full w-[55px] h-[55px]"
                        source={{ uri: item.requestingUser.profilePicture }}
                    />
                ) : (
                    <View className="bg-gray-400 rounded-full w-[55px] h-[55px] items-center justify-center">
                        <Text className="text-white text-center text-3xl">
                            {item.requestingUser.name?.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>
            <View>
                <Text className="text-text-primary-light dark:text-text-primary-dark font-bold">{item.requestingUser.name}</Text>
                <Text className="text-text-secondary-light dark:text-text-secondary-dark capitalize">
                    Wants: <Text className="font-bold">{item.requestedSkill.skillName}</Text>
                </Text>
                <Text className="text-text-secondary-light dark:text-text-secondary-dark capitalize">
                    Offers: <Text className="font-bold">{item.offeredSkill.skillName}</Text>
                </Text>
            </View>
        </View>
    );

    const renderTrade = ({ item }) => (
        item.skillA &&
        <View className="p-3 border-b border-slate-600">
            <Text className="text-main-color-light dark:text-main-color-dark font-bold">
                Trade: {item.skillA} ↔ {item.skillB}
            </Text>
            <Text className="text-gray-400">
                Status: {item.status || "active"}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 p-6 items-center" style={{ marginTop: 30 }}>
            <GradientBackground />

            <View className="w-full h-12 flex-row border-b-[1px] border-b-slate-500">
                <TouchableOpacity
                    onPress={() => setIsClicked("Requests")}
                    className={isClicked == "Requests" ? "ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center"}
                >
                    <Text className={`font-bold text-lg ${isClicked == "Requests" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
                        Requests
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setIsClicked("Trades")}
                    className={isClicked == "Trades" ? " ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center "}
                >
                    <Text className={`font-bold text-lg ${isClicked == "Trades" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
                        Trades
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{ width: "100%" }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={isClicked === "Requests" ? renderRequest : renderTrade}
                ListEmptyComponent={
                    <Text className="text-gray-400 mt-4">
                        {isClicked === "Requests"
                            ? t("No requests yet")
                            : t("No trades yet")}
                    </Text>
                }
            />
        </View>
    );
};

export default TradesScreen;
