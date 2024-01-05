import React from 'react';
import { saveAs } from 'file-saver';

const PdfComponent = ({ fileData }) => {
  const downloadPdf = () => {
    if (fileData && fileData.length > 0) {
      try {
        const decodedData = atob(fileData);
        const uint8Array = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        saveAs(blob, 'output.pdf');
      } catch (error) {
        console.error("Error decoding or creating PDF:", error);
      }
    } else {
      console.error("Invalid or empty fileData");
    }
  };

  return (
    <div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default PdfComponent;
