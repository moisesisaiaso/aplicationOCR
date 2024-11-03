import React, { useEffect, useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import upload from "../assets/icons/upload.png";
import expand from "../assets/icons/expand.png";

import pdf from "../assets/icons/pdf.png";
import pdf1 from "../assets/icons/pdf1.png";
import txt from "../assets/icons/txt.png";
import doc from "../assets/icons/doc.png";

export const InputFile = ({
    uploadImage,
    setUploadImage,
    setExpand,
    setUploadFile,
    extension,
    setExtension,
    tiposImagen,
}) => {
    const handleFileLoad = (e) => {
        const contents = e.target.result;
        setUploadImage(contents);
    };

    const handleInput = (e) => {
        const file = e.target.files[0];
        const extension = file.name.split(".").pop().toLowerCase();
        setExtension(extension);
        const reader = new FileReader();
        if (tiposImagen.includes(extension)) {
            reader.onload = handleFileLoad;
        }

        reader.readAsDataURL(file);

        setUploadFile(file);
    };

    useEffect(() => {
        if (extension === "pdf") {
            setUploadImage(pdf);
        } else if (extension === "docx") {
            setUploadImage(txt);
        }
    }, [extension]);

    return (
        <>
            <div className={generalStyles.upload__inputContainer}>
                <input type="file" onChange={handleInput} />
                <div className={generalStyles.upload__meta}>
                    {uploadImage ? (
                        <>
                            <div className={generalStyles.imagenContainer}>
                                <img src={uploadImage} alt="" />
                                <div
                                    className={generalStyles.expandBtn}
                                    onClick={() => {
                                        setExpand(true);
                                    }}
                                >
                                    <img src={expand} alt="expand" />
                                </div>
                            </div>
                            <p>Haz clic para cambiar la imagen</p>
                        </>
                    ) : (
                        <>
                            <img src={upload} alt="upload" className={generalStyles.upload__icon} />
                            <p>Haz clic para subir o arrastra y suelta una imagen</p>
                            <p>No hay ningún archivo seleccionado</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
