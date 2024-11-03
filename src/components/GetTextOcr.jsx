import React, { useEffect, useRef, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import copy from "../assets/icons/copy.png";
import pdfFile from "../assets/icons/pdf-file.png";
import document from "../assets/icons/document.png";
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

    // copiar texto
    const handleCopyText = async () => {
        try {
            portaPapel.current.select(); // ya que no estamos utilizando la forma antigua para copiar texto esto no seria necesario sin embargo lo estoy utilizando como indicador de que el texto que está señalado se copió
            await navigator.clipboard.writeText(ocr);
            alert("Texto copiado al portapapeles");
        } catch (error) {
            console.log("error al copiar el texto: ", error);
        }
    };

    // crear PDF
    const handleGetPdf = () => {
        const doc = new jsPDF(); // se crear una instacia que es la que crear el archivo pdf
        doc.text(ocr, 10, 10); //accede al metodo text que recibe el texto y las coordenadas iniciales donde se plasmará el texto

        doc.save("output.pdf"); //guarda el archivo y genera un nombre del documento
    };

    // crear Word
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
                            src={copy}
                            alt="iconText"
                            style={{ width: "1.3rem", marginRight: "0.5rem" }}
                        />
                        Copiar Texto
                    </button>
                    <button className={generalStyles.btnGetText} onClick={handleGetPdf}>
                        <img
                            src={pdfFile}
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
                            src={document}
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
