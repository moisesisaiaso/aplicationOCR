import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { InputFile } from "./components/InputFile";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { ModalExpand } from "./components/ModalExpand";
import { Languages } from "./components/Languages";
import { ButtonGetText } from "./components/ButtonGetText";
import { GetTextOcr } from "./components/GetTextOcr";

function App() {
    const [expand, setExpand] = useState(false);

    const [uploadImage, setUploadImage] = useState();

    const [uploadFile, setUploadFile] = useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [completeData, setCompleteData] = useState(false);

    useEffect(() => {
        uploadImage && selectedLanguages.length !== 0
            ? setCompleteData(true)
            : setCompleteData(false);
    }, [uploadImage, selectedLanguages]);

    return (
        <>
            <header>
                <Header />
            </header>
            <main className={generalStyles.container_frame}>
                {/* inputFile */}
                <section className={generalStyles.container_inputFile}>
                    <InputFile
                        uploadImage={uploadImage}
                        setUploadImage={setUploadImage}
                        setExpand={setExpand}
                        setUploadFile={setUploadFile}
                    />
                    {/* modal expand */}
                    <ModalExpand
                        expand={expand}
                        setExpand={setExpand}
                        uploadImage={uploadImage}
                        uploadFile={uploadFile}
                    />
                </section>

                {/* lenguajes */}
                <section className={generalStyles.container_languages}>
                    <Languages
                        selectedLanguages={selectedLanguages}
                        setSelectedLanguages={setSelectedLanguages}
                    />
                </section>

                {/* Extraer texto */}
                <section className={generalStyles.container_btnGetText}>
                    <ButtonGetText completeData={completeData} />
                </section>

                {/* GetTextOrc */}
                <section className={generalStyles.containerGetTextOcr}>
                    <GetTextOcr uploadFile={uploadFile} selectedLanguages={selectedLanguages} />
                </section>

                {/* mascara de fondo */}
                <div
                    className={
                        expand
                            ? generalStyles.backgroundMask + " " + generalStyles.active
                            : generalStyles.backgroundMask
                    }
                    onClick={() => {
                        setExpand(false);
                    }}
                ></div>
            </main>
            <footer>
                <span></span>
                <h5>&copy; DESARROLLADO POR MOISES ISAIAS ORTIZ GRACIA</h5>
                <span>
                    <img src="" alt="" />
                </span>
            </footer>
        </>
    );
}

export default App;
