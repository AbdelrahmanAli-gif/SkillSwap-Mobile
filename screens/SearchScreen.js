import { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getAllOtherUsersFiltered } from "../utils/usersCollection";
import { useAuth } from "../contexts/AuthContext";
import { theme } from "../theme";
import SearchInput from "../components/SearchInput";
import FilterBar from "../components/FilterBar";
import UserCard from "../components/UserCard";
import GradientBackground from "../components/GradientBackground";

const ITEMS_PER_BATCH = 10;

export default function SearchScreen() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const fetchedUsers = await getAllOtherUsersFiltered(user.uid);
            setUsers(fetchedUsers);
            setLoading(false);
        };
        fetchUsers();
    }, [user.uid]);

    const handleSearch = useCallback(() => {
        setVisibleCount(ITEMS_PER_BATCH);
    }, []);

    const handleFilterClick = (label) => {
        setSelectedFilter((prev) => (prev === label ? null : label));
        setVisibleCount(ITEMS_PER_BATCH);
    };

    const filteredUsers = users.filter((user) => {
        const search = searchText.toLowerCase();
        const nameMatch = user.name?.toLowerCase().includes(search);
        const offeredMatch = user.hasSkills?.some((s) =>
            s.skillName.toLowerCase().includes(search)
        );
        const desiredMatch = user.needSkills?.some((s) =>
            s.skillName.toLowerCase().includes(search)
        );

        if (selectedFilter === "Skills Offered") return offeredMatch;
        if (selectedFilter === "Skills Desired") return desiredMatch;

        return nameMatch || offeredMatch || desiredMatch;
    });

    const visibleUsers = filteredUsers.slice(0, visibleCount);

    const handleLoadMore = () => {
        if (visibleCount < filteredUsers.length) {
            setLoadingMore(true);
            setTimeout(() => {
                setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
                setLoadingMore(false);
            }, 500);
        }
    };

    return (
        <View className="flex-1 px-4 py-2">
            <GradientBackground />
            <SearchInput
                searchFunction={handleSearch}
                placeholderText="Search by user name or skills..."
                inputState={searchText}
                setInputState={setSearchText}
            />

            <FilterBar selected={selectedFilter} onFilterClick={handleFilterClick} />

            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={theme.colors.main} />
                </View>
            ) : (
                <FlatList
                    data={visibleUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserCard user={item} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator size="large" color={theme.colors.main} />
                        ) : null
                    }
                    ListEmptyComponent={
                        <Text className="text-text-primary text-center mt-10 text-lg">
                            No users found
                        </Text>
                    }
                />
            )}
        </View>
    );
}
