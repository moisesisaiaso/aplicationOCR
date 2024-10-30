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
    const handleCopyText = () => {
        //para copiar un texto es necesario que primero se seleccione por eso el texto a copiar debe ser el que este en un textarea  si el texto no viene directamente de un textarea como estrategia podemos crear uno y  ocultar el elemento y accedemos a esa etiqueta.
        portaPapel.current.select(); // selecciona el texto del textarea
        document.execCommand("copy"); // copia el texto seleccionado
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
