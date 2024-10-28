import React, { useEffect, useRef, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import sheet from "../assets/icons/sheet.png";
import { jsPDF } from "jspdf";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const GetTextOcr = ({ ocr, setOcr, uploadFile }) => {
    const portaPapel = useRef(null);

    useEffect(() => {
        setOcr("");
    }, [uploadFile]);

    const handleOnChange = (e) => {
        const currentText = e.target.value;
        setOcr(currentText);
    };

    const handleCopyText = () => {
        portaPapel.current.select();
        document.execCommand("copy");
    };

    const handleGetPdf = () => {
        const doc = new jsPDF();
        doc.text(ocr, 10, 10);

        doc.save("output.pdf");
    };

    const handleGetWord = async () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [new TextRun(ocr)],
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "output.docx");
    };

    return (
        <>
            <textarea
                ref={portaPapel}
                name=""
                id=""
                placeholder="El texto extraído aparecerá aquí..."
                className={generalStyles.getTextOcr}
                disabled={ocr ? false : true}
                value={ocr && ocr}
                onChange={handleOnChange}
            ></textarea>
            {ocr && (
                <div className={generalStyles.getTextBtnsContainer}>
                    <button className={generalStyles.btnGetText} onClick={handleCopyText}>
                        <img
                            src={sheet}
                            alt="iconText"
                            style={{ width: "1.3rem", marginRight: "0.5rem" }}
                        />
                        Copiar Texto
                    </button>
                    <button className={generalStyles.btnGetText} onClick={handleGetPdf}>
                        <img
                            src={sheet}
                            alt="iconText"
                            style={{
                                width: "1.3rem",
                                marginRight: "0.5rem",
                            }}
                        />
                        Descargar PDF
                    </button>
                    <button className={generalStyles.btnGetText} onClick={handleGetWord}>
                        <img
                            src={sheet}
                            alt="iconText"
                            style={{ width: "1.3rem", marginRight: "0.5rem" }}
                        />
                        Descargar Word
                    </button>
                </div>
            )}
        </>
    );
};
