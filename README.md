# OCR APP

Esta aplicación OCR te permite extraer texto de imágenes y archivos no editables en varios idiomas.

## Formatos compatibles

-   **Imágenes**: JPG, JPEG, PNG, GIF, BMP, TIFF
-   **Documentos**: PDF, DOCX

## Instalación

Las instrucciones para instalar la app son las generales de cualquier app de React:

1. Clona el repositorio.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm start` para iniciar la aplicación.

## Uso

Aquí tienes un video de cómo podría usarse la aplicación:

[Enlace al video]

## Librerías utilizadas

-   `tesseract.js`
-   `mammoth`
-   `pdfjsLib` (a través de CDN)
-   `jspdf`
-   `file-saver`
-   `docx`

## Código importante

### Configuración de Vite

Para que `tesseract.js` funcione correctamente, es necesario externalizarlo en el archivo `vite.config.js` para evitar conflictos con la librería en cuanto a duplicidad de dependencias, entre otros.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            external: ["tesseract.js"],
        },
    },
});
```

# Uso de pdfjsLib

En el archivo `index.html`, se incluye el CDN para la librería `pdfjsLib`:

```html
<script src="//mozilla.github.io/pdf.js/build/pdf.mjs" type="module"></script>
```

## Comentarios importantes en `useTypeDocument.js`

-   **Uso de `Tesseract.createWorker`**: Se utiliza un worker para procesar el OCR en un hilo separado, evitando problemas de rendimiento e interrupciones en la interfaz de usuario.
-   **Configuración de `pdfjsLib`**: Se configura el worker de `pdfjsLib` para evitar problemas de CORS.

Puesdes descargar el archivo pdf.worker.mjs desde el repositorio de PDF.js en GitHub: pdf.worker.mjs. (https://github.com/mozilla/pdf.js/blob/master/build/pdf.worker.mjs)

```javascript
pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.mjs"; // Crea un worker haciendo referencia al worker de la libreria descargado en la ruta js/pdf.worker.mjs
```

## Uso de `jsPDF` y `docx`

En el archivo `GetTextOcr.jsx`, se utilizan las librerías `jsPDF` y `docx` para generar y descargar archivos PDF y Word a partir del texto extraído.

```javascript
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
```
