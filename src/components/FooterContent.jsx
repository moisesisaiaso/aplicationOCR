import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

import telephone from "../assets/icons/telephone.png";
import question from "../assets/icons/question.png";
import question1 from "../assets/icons/question1.png";
import email from "../assets/icons/email.png";
import code from "../assets/icons/code.png";
import code1 from "../assets/icons/code01.png";
import document from "../assets/icons/document1.png";
import img from "../assets/icons/img.png";
export const FooterContent = ({ switchActive }) => {
    return (
        <>
            <div className={generalStyles.footerContainer}>
                <div className={generalStyles.footerInfo}>
                    <img src={switchActive ? question1 : question} alt="" />
                    {/* contactame */}
                    <div
                        className={generalStyles.contact}
                        style={{ left: "1.5rem", width: "21rem" }}
                    >
                        <h2>¿Qué puedo hacer?</h2>
                        <p>
                            Esta aplicación OCR te permite extraer texto de imágenes y archivos no
                            editables en varios idiomas.
                        </p>
                        <h3>Formatos compatibles: </h3>
                        <div>
                            <img src={img} alt="" />
                            <span>
                                <span className={generalStyles.contact_formatos}>Imágenes:</span>{" "}
                                JPG, JPEG, PNG, GIF, BMP, TIFF
                            </span>
                        </div>
                        <div>
                            <img src={document} alt="" />
                            <span>
                                <span className={generalStyles.contact_formatos}>Documentos:</span>{" "}
                                PDF, DOCX
                            </span>
                        </div>
                    </div>
                </div>
                <h5>&copy; DESARROLLADO POR MOISES ISAIAS ORTIZ GRACIA</h5>
                <div className={generalStyles.footerInfo}>
                    <img src={switchActive ? code1 : code} alt="" />
                    {/* contactame */}
                    <div className={generalStyles.contact}>
                        <h2>Contáctame</h2>
                        <div>
                            <img src={telephone} alt="" />
                            <span>(+593) 096 971 8160</span>
                        </div>
                        <div>
                            <img src={email} alt="" />
                            <span>moises.ortiz@utelvt.edu.ec</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
