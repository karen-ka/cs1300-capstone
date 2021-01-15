import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch, Input } from "antd";

export default function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = React.useState();
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    // Avoid theme change flicker
    if (status === "loading") {
        return null;
    }

    return (
        <div className="main fade-in">
            <h1>The current theme is: {currentTheme}</h1>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
        </div>
    );
}