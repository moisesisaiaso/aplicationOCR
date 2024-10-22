import React from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";
export const ModalExpand = ({ expand, setExpand, uploadImage, uploadFile }) => {
    const sizeFile = (uploadFile?.size / 1024).toFixed(2);

    return (
        <div
            className={
                expand ? generalStyles.modal + " " + generalStyles.modalActive : generalStyles.modal
            }
        >
            <button
                className={generalStyles.modalClose}
                onClick={() => {
                    setExpand(false); //cierra la capa de opacidad
                }}
            >
                X
            </button>
            <div className={generalStyles.container_expand}>
                <div className={generalStyles.container_information}>
                    <img src={uploadImage} alt="" />
                    <div>
                        <h3>Nombre</h3>
                        <p>{uploadFile?.name}</p>
                        <hr />
                        <h3>Peso</h3>
                        <p>{sizeFile} KB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
