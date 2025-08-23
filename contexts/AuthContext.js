import { createContext, useContext, useEffect, useState } from 'react';
import { USER_KEY, setItem, getItem, removeItem } from "../services/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await getItem(USER_KEY);
                if (savedUser) {
                    setUserState(JSON.parse(savedUser));
                }
            } catch (e) {
                console.log("Failed to load user from storage", e);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const setUser = async (userData) => {
        if (userData) {
            setUserState(userData);
            await setItem(USER_KEY, JSON.stringify(userData));
        } else {
            setUserState(null);
            await removeItem(USER_KEY);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("useAuth must be used within a AuthProvider");
    return context;
}
