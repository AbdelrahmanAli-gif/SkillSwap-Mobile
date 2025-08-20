import { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemTheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState(systemTheme || "light");
    const { setColorScheme } = useNativewindColorScheme();

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme || "light");
            setColorScheme(colorScheme || "light");
        });
        return () => subscription.remove();
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            setColorScheme(newTheme);
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
