import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { InputFile } from "./components/InputFile";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { ModalExpand } from "./components/ModalExpand";
import { Languages } from "./components/Languages";
import { ButtonGetText } from "./components/ButtonGetText";
import { GetTextOcr } from "./components/GetTextOcr";
import { createWorker } from "tesseract.js";
function App() {
    const [ocr, setOcr] = useState("");

    const [expand, setExpand] = useState(false);

    const [uploadImage, setUploadImage] = useState();

    const [uploadFile, setUploadFile] = useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [completeData, setCompleteData] = useState(false);

    const languagesJoin = selectedLanguages.join("+");

    console.log(uploadFile);
    const worker = createWorker();

    // convertir imagen a texto
    const convertImageToText = async () => {
        console.log("convertir");

        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("en");
        const { data } = await worker.recognize(uploadFile);

        setOcr(data.text);
        console.log(data.text);
    };

    useEffect(() => {
        uploadImage && selectedLanguages.length !== 0
            ? setCompleteData(true)
            : setCompleteData(false);
    }, [uploadImage, selectedLanguages]);

    return (
        <>
            <div className={generalStyles.containerGrid}>
                <header>
                    <Header />
                </header>
                <main className={generalStyles.container_frame}>
                    <div className={generalStyles.containerGroup}>
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
                            <ButtonGetText
                                completeData={completeData}
                                convertImageToText={convertImageToText}
                            />
                        </section>
                    </div>
                    {/* GetTextOrc */}
                    <section className={generalStyles.containerGetTextOcr}>
                        <GetTextOcr
                            uploadFile={uploadFile}
                            selectedLanguages={selectedLanguages}
                            ocr={ocr}
                        />
                    </section>
                </main>
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
                <footer>
                    <span></span>
                    <h5>&copy; DESARROLLADO POR MOISES ISAIAS ORTIZ GRACIA</h5>
                    <span>
                        <img src="" alt="" />
                    </span>
                </footer>
            </div>
        </>
    );
}

export default App;
