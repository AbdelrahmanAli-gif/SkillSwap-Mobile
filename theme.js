export const theme = (mode = "dark") => ({
    colors: {
        main: mode === "light" ? "#e0541d" : "#fe7843",
        textPrimary: mode === "light" ? "#4d2608" : "#b4afa8",
        textSecondary: mode === "light" ? "#4a4745" : "#7c7c7c",
        textLight: mode === "light" ? "#000000" : "#ffffff",
        textDark: mode === "light" ? "#ffffff" : "#000000",
        inputBg: mode === "light" ? "#ffffff" : "rgba(21, 19, 19, 0.968)",
        cardBorder: mode === "light" ? "#dcdcdc" : "#8b6f5a",
        cardContentBorder: mode === "light" ? "#e0e0e0" : "#5d5149",
        skillTeachBg: "#ffe5b4",
        skillLearnBg: "#bc640dd8",
        btnSubmitBg: mode === "light" ? "#68482f" : "#8b6f5a",
        btnSubmitHover: mode === "light" ? "#a27655" : "#635041",
        navigationBackground: mode === "light" ? "#d0b49f" : "#20201c",
    },
});