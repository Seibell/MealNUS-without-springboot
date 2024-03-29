import { createTheme } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

// color design tokens export
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            white: {
                100: "#0a0a0a",
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            blueAccent: {
                100: "#c1d2ff",
                200: "#95b5ff",
                300: "#6989ff",
                400: "#3d5cff",
                500: "#113fff",
                600: "#0f38cc",
                700: "#0c2d99",
                800: "#0a2366",
                900: "#081933",
            },
            orangeAccent: {
                100: "#40280c",
                200: "#714710",
                300: "#a16b18",
                400: "#d18f22",
                500: "#ffb22c",
                600: "#ffc35a",
                700: "#ffd488",
                800: "#ffe5b7",
                900: "#fff6e5",
            },
            mealNUSBlue: {
                100: "#edf4ff",
            },
            mealNUSOrange: {
                100: "#f7e8d7",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            white: {
                100: "#fafafa",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0",
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
            orangeAccent: {
                100: "#fff6e5",
                200: "#ffe5b7",
                300: "#ffd488",
                400: "#ffc35a",
                500: "#ffb22c",
                600: "#d18f22",
                700: "#a16b18",
                800: "#714710",
                900: "#40280c",
            },
            mealNUSBlue: {
                100: "#084896",
            },
            mealNUSOrange: {
                100: "#ed8b1c",
            },
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.orangeAccent[500],
                    },
                    neutral: {
                        dark: colors.blueAccent[700],
                        main: colors.blueAccent[500],
                        light: colors.blueAccent[100],
                    },
                    background: {
                        default: colors.primary[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.orangeAccent[500],
                    },
                    neutral: {
                        dark: colors.blueAccent[700],
                        main: colors.blueAccent[500],
                        light: colors.blueAccent[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState(localStorage.getItem("color-mode") || "light");

    useEffect(() => {
        localStorage.setItem("color-mode", mode);
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode(prev => (prev === "light" ? "dark" : "light")),
        }),
        [setMode]
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};