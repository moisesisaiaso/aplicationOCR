import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const GetTextOcr = ({ uploadFile, selectedLanguages }) => {
    const [getText, setGetText] = useState();
    return (
        <>
            <textarea
                name=""
                id=""
                placeholder="El texto extraído aparecerá aquí..."
                className={generalStyles.getTextOcr}
                disabled={true}
                value={getText && getText}
            ></textarea>
        </>
    );
};
