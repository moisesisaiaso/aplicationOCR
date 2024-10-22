import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import file from "../assets/icons/file.png";
import sheet from "../assets/icons/sheet.png";
import { ReloadOutlined } from "@ant-design/icons";
export const ButtonGetText = ({ completeData }) => {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        console.log("hola");
    };
    return (
        <>
            <button
                className={
                    completeData
                        ? generalStyles.btnGetText
                        : generalStyles.btnGetText + " " + generalStyles.disabled
                }
                disabled={!completeData}
                onClick={handleClick}
            >
                <span>
                    {loading ? (
                        <ReloadOutlined
                            spin={true}
                            style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                        />
                    ) : (
                        <img src={sheet} alt="iconText" style={{ width: "1.3rem" }} />
                    )}
                    Extraer Texto
                </span>
            </button>
        </>
    );
};
