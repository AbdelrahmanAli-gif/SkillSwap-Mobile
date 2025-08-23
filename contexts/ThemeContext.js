import { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { THEME_KEY, setItem, getItem } from "../services/storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { setColorScheme } = useNativewindColorScheme();
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await getItem(THEME_KEY);
            if (savedTheme) {
                setTheme(savedTheme);
                setColorScheme(savedTheme);
            } else {
                const systemTheme = Appearance.getColorScheme() || "light";
                setTheme(systemTheme);
                setColorScheme(systemTheme);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            setColorScheme(newTheme);
            setItem(THEME_KEY, newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
