import { useState } from "react";

import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js";
// (worker es un hilo de trabajo aislado al principal lo que permite que procesos complejos o conuna carca alta se ejecuten en ese hilo, esto evita problemas de rendimiento e interrupciones con la fluidez de la interfaz, eneste caso  el proceso OCR al tener un procesamiento alto puedde interferir con la fluidez de la app y su interfaz por este motivo utilizamos un worker)

import mammoth from "mammoth";
export const useTypeDocument = (file, languagesJoin) => {
    const [ocrText, setOcrText] = useState();

    const outputOpts = {
        text: true,
        blocks: true,
        hocr: true,
        tsv: true,
        box: false,
        unlv: false,
        osd: false,
        pdf: true,
        imageColor: false,
        imageGrey: false,
        imageBinary: false,
    };

    //* texto de archivo de imagen
    const typeImg = async () => {
        console.log("convertir");

        // OJO para que tesseract funcione es necesario externalizarlo, esto se hace desde el archivo vite.config.js;  nos permite evitar conflictos con la libreria encuanto a sus duplicidad de dependencias entre otros
        const worker = await Tesseract.createWorker(languagesJoin, 1, {
            logger: (m) => console.log(m),
        });
        // Cargar el worker y el idioma

        // Realizar el reconocimiento de texto:
        const {
            data: { text },
        } = await worker.recognize(file, undefined, outputOpts);

        setOcrText(text);
        console.log(text);

        // Terminar el worker
        await worker.terminate();
        return text;
    };

    //* texto de archivo pdf no editable(imagen)
    const typePdf = async () => {
        const worker = await Tesseract.createWorker(languagesJoin, 1, {
            logger: (m) => console.log(m),
        });

        const arrayBuffer = await file.arrayBuffer();

        // window.pdfjsLib; se hace uso del CDN encrustado en la carpeta index.html
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.mjs"; //Crea un worker haciendo referencia al worker de la libreria descargado en la ruta js/pdf.worker.mjs

        const pdfData = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdfData.numPages; // obtengo el nuemero de paginas totales del archivo

        //se crea un array con la longitud de las paginas totales y se hace un mapeo  para capturar el texto de cada pagina y retornar como un elemento del array
        const textPromises = Array.from({ length: numPages }, async (_, index) => {
            const page = await pdfData.getPage(index + 1);
            const viewport = page.getViewport({ scale: 1.0 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            const pageImage = canvas.toDataURL("image/png");
            const {
                data: { text },
            } = await worker.recognize(pageImage, undefined, outputOpts);
            return text;
        });
        const texts = await Promise.all(textPromises);
        setOcrText(texts.join("\n")); //se obtiene un string de los elementos del array separados por un salto de linea

        // Terminar el worker
        await worker.terminate();
        return texts;
    };

    //* texto de archivo word editable o no editable(imagen)
    const typeDocument = async () => {
        const worker = await Tesseract.createWorker(languagesJoin, 1, {
            logger: (m) => console.log(m),
        });

        const arrayBuffer = await file.arrayBuffer(); // se utiliza para leer el contenido de un archivo o una respuesta HTTP y convertirlo en un ArrayBuffer
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer }); //para convertir el documento de Word a HTML.
        const parser = new DOMParser(); //para analizar el HTML y extraer las imágenes.
        const doc = parser.parseFromString(html, "text/html");
        const elements = doc.body.childNodes; //abtengo todos los elementos hijos del body
        console.log("elemento: " + elements[0].textContent.length);
        const textPromises = Array.from(elements).map(async (element) => {
            //si el elemento es una imagen analiza con el OCR y retorna el texto
            if (element.nodeName === "img") {
                const src = element.src; // representación codificada de la imagen que está incrustada en el documento
                const response = await fetch(src); //
                const blob = await response.blob();
                const {
                    data: { text },
                } = await worker.recognize(blob, undefined, outputOpts);
                return text;
            } else {
                //de lo contrario solo accede al texto editable del elemento y retorna
                return element.textContent;
            }
        });
        const texts = await Promise.all(textPromises); //Promise.all() permite masnejar multiples promesas de foorma concurrente, se espera hasta que todas las procesas se resuelvan o si se rechaza alguna
        setOcrText(texts.join("\n"));

        // Terminar el worker
        await worker.terminate();
        return texts;
    };

    return [ocrText, typeImg, typePdf, typeDocument];
};

//!OJO
//^ en este caso para la funcion typepdf estabamos teniendo problemas de CORS con el worker entonces descargamos el trabajador(worker) de PDF.js:

//^ Descarga el archivo pdf.worker.mjs desde el repositorio de PDF.js en GitHub: pdf.worker.mjs. (https://github.com/mozilla/pdf.js/blob/master/build/pdf.worker.mjs)

//^ Coloca el archivo en tu proyecto:

//^ Coloca el archivo pdf.worker.mjs en una carpeta de tu proyecto, por ejemplo, en public/js.

//^ Configura el trabajador en tu proyecto:

//^ Configura la URL del trabajador para que apunte al archivo local en tu proyecto.
