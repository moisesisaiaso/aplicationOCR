import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { InputFile } from "./components/InputFile";
import generalStyles from "./assets/styles/generalStyles.module.css";

import telephone from "./assets/icons/telephone.png";
import question from "./assets/icons/question.png";
import question1 from "./assets/icons/question1.png";
import email from "./assets/icons/email.png";

import { ModalExpand } from "./components/ModalExpand";
import { Languages } from "./components/Languages";
import { ButtonGetText } from "./components/ButtonGetText";
import { GetTextOcr } from "./components/GetTextOcr";
// import Tesseract from "tesseract.js";    importacion por descarga

import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js";

import pdfjsDist from "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/+esm";

import { useTypeDocument } from "./hooks/useTypeDocument";
// importacion por CDN

function App() {
    const [switchActive, setSwitchActive] = useState(false);

    const [expand, setExpand] = useState(false);

    const [uploadImage, setUploadImage] = useState();

    const [uploadFile, setUploadFile] = useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [completeData, setCompleteData] = useState(false);

    const languagesJoin = selectedLanguages.join("+");

    const [ocrText, typeImg, TypePdf, typeDocument] = useTypeDocument(uploadFile, languagesJoin);

    const [ocr, setOcr] = useState("");

    console.log(uploadFile?.name.split(".").pop());

    const [extension, setExtension] = useState();

    const tiposImagen = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];
    const tiposDocumento = ["doc", "docx", "txt", "csv", "xls", "xlsx", "tab"];

    const getText = async () => {
        if (tiposImagen.includes(extension)) {
            await typeImg();
        } else if (tiposDocumento.includes(extension)) {
            await typeDocument();
        } else {
            await TypePdf();
        }

        setOcr(ocrText);
        return ocr;
    };

    useEffect(() => {
        setOcr(ocrText);
    }, [ocrText]);

    // const outputOpts = {
    //     text: true,
    //     blocks: true,
    //     hocr: true,
    //     tsv: true,
    //     box: false,
    //     unlv: false,
    //     osd: false,
    //     pdf: true,
    //     imageColor: false,
    //     imageGrey: false,
    //     imageBinary: false,
    // };

    // const convertImageToText = async () => {
    //     console.log("convertir");

    //     // OJO para que tesseract funcione es necesario externalizarlo, esto se hace desde el archivo vite.config.js;  nos permite evitar conflictos con la libreria encuanto a sus duplicidad de dependencias entre otros
    //     const worker = await Tesseract.createWorker(languagesJoin, 1, {
    //         logger: (m) => console.log(m),
    //     });
    //     // Cargar el worker y el idioma

    //     // Realizar el reconocimiento de texto:
    //     const {
    //         data: { text },
    //     } = await worker.recognize(uploadFile, undefined, outputOpts);

    //     setOcr(text);
    //     console.log(text);

    //     // Terminar el worker
    //     await worker.terminate();
    //     return text;
    // };

    useEffect(() => {
        uploadImage && selectedLanguages.length !== 0
            ? setCompleteData(true)
            : setCompleteData(false);
    }, [uploadImage, selectedLanguages]);

    return (
        <>
            <div className={generalStyles.containerGrid}>
                <header>
                    <Header switchActive={switchActive} setSwitchActive={setSwitchActive} />
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
                                extension={extension}
                                setExtension={setExtension}
                                tiposImagen={tiposImagen}
                                tiposDocumento={tiposDocumento}
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
                            <ButtonGetText completeData={completeData} getText={getText} />
                        </section>
                    </div>
                    {/* GetTextOrc */}
                    <section className={generalStyles.containerGetTextOcr}>
                        <GetTextOcr ocr={ocr} setOcr={setOcr} uploadFile={uploadFile} />
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
                    <div className={generalStyles.footerInfo}>
                        <img src={switchActive ? question1 : question} alt="" />
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
                </footer>
            </div>
        </>
    );
}

export default App;
