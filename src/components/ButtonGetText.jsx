import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import file from "../assets/icons/file.png";
import sheet from "../assets/icons/sheet.png";
import { ReloadOutlined } from "@ant-design/icons";
export const ButtonGetText = ({ completeData, convertImageToText }) => {
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);
        await convertImageToText();
        setLoading(false);

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
                style={{ backgroundColor: "#FF3B5C" }}
            >
                {loading ? (
                    <span>
                        <ReloadOutlined
                            spin={true}
                            style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                        />
                        Analizando
                    </span>
                ) : (
                    <span>
                        <img src={sheet} alt="iconText" style={{ width: "1.3rem" }} />
                        Extraer Texto
                    </span>
                )}
            </button>
        </>
    );
};
