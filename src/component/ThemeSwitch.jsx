import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch, Input } from "antd";

export default function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = React.useState();
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();

    const getOtherTheme = () => {
        if (currentTheme == "dark") {
            return "light";
        }
        return "dark";
    }

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
        localStorage.setItem('theme', getOtherTheme());
        console.log(localStorage.getItem('theme'))
    };

    const darkMode = () => {
        return localStorage.getItem('theme') == 'dark';
    }

    const getText = () => {
        return localStorage.getItem('theme') == 'dark' ? 'Dark' : 'Light';
    }
    // Avoid theme change flicker
    if (status === "loading") {
        return null;
    }

    return (
        // <div className="main fade-in">
        <>{getText()} Theme <Switch size="default" checked={darkMode()} onChange={toggleTheme} /> </>
        // </div>
    );
}