import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const GetTextOcr = ({ uploadFile, selectedLanguages, ocr }) => {
    return (
        <>
            <textarea
                name=""
                id=""
                placeholder="El texto extraído aparecerá aquí..."
                className={generalStyles.getTextOcr}
                disabled={true}
                value={ocr && ocr}
            ></textarea>
        </>
    );
};
