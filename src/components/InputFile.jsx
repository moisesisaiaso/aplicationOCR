import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
import upload from "../assets/icons/upload.png";
import expand from "../assets/icons/expand.png";

export const InputFile = ({ uploadImage, setUploadImage, setExpand, setUploadFile }) => {
    const handleFileLoad = (e) => {
        const contents = e.target.result;
        setUploadImage(contents);
    };

    const handleInput = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = handleFileLoad;

        reader.readAsDataURL(file);

        setUploadFile(file);
    };

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
