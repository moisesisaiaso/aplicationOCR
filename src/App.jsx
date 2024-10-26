import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { InputFile } from "./components/InputFile";
import generalStyles from "./assets/styles/generalStyles.module.css";
import { ModalExpand } from "./components/ModalExpand";
import { Languages } from "./components/Languages";
import { ButtonGetText } from "./components/ButtonGetText";
import { GetTextOcr } from "./components/GetTextOcr";
// import Tesseract from "tesseract.js";    importacion por descarga

import Tesseract from 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js';  
// importacion por CDN
function App() {
    const [ocr, setOcr] = useState("");

    const [expand, setExpand] = useState(false);

    const [uploadImage, setUploadImage] = useState();

    const [uploadFile, setUploadFile] = useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [completeData, setCompleteData] = useState(false);

    const languagesJoin = selectedLanguages.join("+");

    console.log(uploadFile);
    // (worker es un hilo de trabajo aislado al principal lo que permite que procesos complejos o conuna carca alta se ejecuten en ese hilo, esto evita problemas de rendimiento e interrupciones con la fluidez de la interfaz, eneste caso  el proceso OCR al tener un procesamiento alto puedde interferir con la fluidez de la app y su interfaz por este motivo utilizamos un worker)
    // crea el worker

    const outputOpts = {
        text: true,
        blocks: true,
        hocr: true,
        tsv: true,
        box: false,
        unlv: false,
        osd: false,
        pdf: false,
        imageColor: false,
        imageGrey: false,
        imageBinary: false,
    };

    const convertImageToText = async () => {
        console.log("convertir");

        // OJO para que tesseract funcione es necesario externalizarlo, esto se hace desde el archivo vite.config.js;  nos permite evitar conflictos con la libreria encuanto a sus duplicidad de dependencias entre otros
        const worker = await Tesseract.createWorker(languagesJoin, 1, {
            logger: (m) => console.log(m),
        });
        // Cargar el worker y el idioma

        // Realizar el reconocimiento de texto:
        const {
            data: { text },
        } = await worker.recognize(uploadFile, undefined, outputOpts);

        setOcr(text);
        console.log(text);

        // Terminar el worker
        await worker.terminate();
        return text;
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
