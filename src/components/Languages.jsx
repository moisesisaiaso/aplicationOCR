import React, { useState } from "react";
import generalStyles from "../assets/styles/generalStyles.module.css";

export const Languages = ({ selectedLanguages, setSelectedLanguages }) => {
    const languages = [
        { id: "es", name: "Español" },
        { id: "en", name: "Inglés" },
        { id: "fr", name: "Francés" },
        { id: "de", name: "Alemán" },
        { id: "it", name: "Italiano" },
        { id: "pt", name: "Portugués" },
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
