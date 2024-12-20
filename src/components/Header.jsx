import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import light from "../assets/icons/light.png";
import light1 from "../assets/icons/light1.png";
import dark from "../assets/icons/dark.png";
import dark1 from "../assets/icons/dark1.png";
import { Switch } from "antd";

const themes = [
    { label: "Predeterminado", value: "default" },
    { label: "Atardecer", value: "sunset" },
    { label: "Bosque", value: "forest" },
    { label: "Océano", value: "ocean" },
    { label: "Lavanda", value: "lavender" },
];

const themesStyles = [
    {
        "--color-primary": "#3b82f6",
        "--color-primary-hover": "#5998fd",
        "--color-secondary": "#10b981",
        "--color-accent": "#14de9b",
    },
    {
        "--color-primary": "#F59E0B",
        "--color-primary-hover": "#f1b651",
        "--color-secondary": "#EF4444",
        "--color-accent": "#EC4899",
    },
    {
        "--color-primary": "#059669",
        "--color-primary-hover": "#04a974",
        "--color-secondary": "#84CC16",
        "--color-accent": "#14B8A6",
    },
    {
        "--color-primary": "#0EA5E9",
        "--color-primary-hover": "#38b5ef",
        "--color-secondary": "#06B6D4",
        "--color-accent": "#6366F1",
    },
    {
        "--color-primary": "#8B5CF6",
        "--color-primary-hover": "#9875eb",
        "--color-secondary": "#A78BFA",
        "--color-accent": "#C084FC",
    },
];
export const Header = ({ switchActive, setSwitchActive }) => {
    const [theme, setTheme] = useState("default");

    const root = document.documentElement;

    useEffect(() => {
        const themeStyle =
            theme === "default"
                ? themesStyles[0]
                : theme === "sunset"
                ? themesStyles[1]
                : theme === "forest"
                ? themesStyles[2]
                : theme === "ocean"
                ? themesStyles[3]
                : themesStyles[4];

        const entradas = Object.entries(themeStyle);

        entradas.forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        console.log("hola");
    }, [theme]);

    useEffect(() => {
        const darkOrLight = switchActive
            ? {
                  "--background-color": "#1f2937",
                  "--color-h1": "white",
                  "--color-border": "#374151",
                  "--color-gray": "#374151",
                  "--color-gray-hover": "#4d5a70",
                  "--color": "white",
                  "--background-light-dark": "#111827",
                  "--color-h3": "white",
                  "--color-placeholder": "#b0b0b6",
                  "--backgroundModal-light-dark": "#111827",
              }
            : {
                  "--background-color": "none",
                  "--color-h1": "#1f2937",
                  "--color-border": "rgb(205, 205, 205)",
                  "--color-gray": "#e5e7eb",
                  "--color-gray-hover": "#cdcfd3",
                  "--color": "black",
                  "--background-light-dark": "white",
                  "--color-h3": "#374151",
                  "--color-placeholder": "none",
                  "--backgroundModal-light-dark": "#eff1f7",
              };

        const entradas = Object.entries(darkOrLight);

        entradas.forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [switchActive]);

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setSwitchActive(checked);
    };
    return (
        <>
            <h1>Aplicacion OCR</h1>
            <div className={generalStyles.headerContainer_right}>
                <div className={generalStyles.selectContainer}>
                    <select
                        name=""
                        id=""
                        className={generalStyles.headerContainer_select}
                        value={theme}
                        onChange={({ target }) => setTheme(target.value)}
                    >
                        {themes.map((theme, i) => (
                            <option value={theme.value} key={i}>
                                {theme.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={generalStyles.headerContainer_btns}>
                    <img
                        src={switchActive ? light1 : light}
                        alt="light"
                        className={generalStyles.header_iconsLightDark}
                    />
                    <Switch
                        style={
                            switchActive && {
                                backgroundColor: "black",
                            }
                        }
                        onChange={onChange}
                        className={
                            switchActive
                                ? generalStyles.ant_switch_handle +
                                  " " +
                                  generalStyles.ant_switch_handleActive
                                : generalStyles.ant_switch_handle
                        }
                    />
                    <img
                        src={switchActive ? dark1 : dark}
                        alt="dark"
                        className={generalStyles.header_iconsLightDark}
                    />
                </div>
            </div>
        </>
    );
};
