import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import light from "../assets/icons/light.png";
import dark from "../assets/icons/dark.png";
import { Switch } from "antd";

const themes = [
    { label: "Predeterminado", value: "default" },
    { label: "Atardecer", value: "sunset" },
    { label: "Bosque", value: "forest" },
    { label: "Océano", value: "ocean" },
    { label: "Lavanda", value: "lavender" },
];
export const Header = () => {
    const [switchActive, setSwitchActive] = useState(false);
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setSwitchActive(checked);
    };
    return (
        <>
            <h1>Aplicacion OCR</h1>
            <div className={generalStyles.headerContainer_right}>
                <div className={generalStyles.selectContainer}>
                    <select name="" id="" className={generalStyles.headerContainer_select}>
                        {themes.map((theme, i) => (
                            <option value={theme.value} key={i}>
                                {theme.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={generalStyles.headerContainer_btns}>
                    <img src={light} alt="light" className={generalStyles.header_iconsLightDark} />
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
                    <img src={dark} alt="dark" className={generalStyles.header_iconsLightDark} />
                </div>
            </div>
        </>
    );
};
