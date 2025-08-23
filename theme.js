export const theme = (mode = "dark") => ({
    colors: {
        main: mode === "light" ? "#F05A1F" : "#fe7843",
        textPrimary: mode === "light" ? "#000000" : "#f4f2ee",
        textSecondary: mode === "light" ? "#4a4745" : "#f4f2eece",
        textLight: mode === "light" ? "#000000" : "#ffffff",
        textDark: mode === "light" ? "#ffffff" : "#000000",
        inputBg: mode === "light" ? "#ffffff" : "rgba(21, 19, 19, 0.968)",
        cardBorder: mode === "light" ? "#dcdcdc" : "#8b6f5a",
        cardContentBorder: mode === "light" ? "#e0e0e0" : "#5d5149",
        skillTeachBg: mode === "light" ? "#e5cdb4" : "#ffe5b4",
        skillLearnBg: "#bc640dd8",
        btnSubmitBg: mode === "light" ? "#BF8B64" : "#b88e6e",
        btnSubmitHover: mode === "light" ? "#a27655" : "#8e6b51",
        navigationBackground: mode === "light" ? "#ffffff" : "#20201c",
        headerBackground: mode === "light" ? "#000000" : "#20201c",
    },
});