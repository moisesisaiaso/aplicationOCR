import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const Languages = ({ selectedLanguages, setSelectedLanguages }) => {
    const languages = [
        { id: "spa", name: "Español" },
        { id: "eng", name: "Inglés" },
        { id: "fra", name: "Francés" },
        { id: "deu", name: "Alemán" },
        { id: "ita", name: "Italiano" },
        { id: "por", name: "Portugués" },
        { id: "chi_tra", name: "Chino" },
        { id: "jpn", name: "Japones" },
        { id: "ara", name: "Arabe" },
    ];

    const handleClick = (id) => {
        const exist = selectedLanguages.includes(id);
        if (exist) {
            setSelectedLanguages(selectedLanguages.filter((lenguage) => lenguage !== id));
        } else {
            setSelectedLanguages([...selectedLanguages, id]);
        }
    };

    return (
        <>
            <h3>Idiomas a reconocer:</h3>
            <div className={generalStyles.languages_btns}>
                {languages.map(({ id, name }) => {
                    const selected = selectedLanguages.includes(id);

                    return (
                        <div
                            key={id}
                            className={
                                selected
                                    ? generalStyles.languages_btnSelected +
                                      " " +
                                      generalStyles.selected
                                    : generalStyles.languages_btnSelected
                            }
                            onClick={() => handleClick(id)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
