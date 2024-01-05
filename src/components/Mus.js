import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

const Mus = () => {
  const [pdfData, setPdfData] = useState(null);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/bytesfarms/resume/get?jobPositionId=43');
        const data = await response.json();
        setPdfData(data[0].fileData); // Assuming fileData contains the PDF content
      } catch (error) {
        console.error('Error fetching PDF data', error);
      }
    };

    fetchData();
  }, []);

  const downloadPdf = () => {
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, 'resume.pdf'); // You can change 'resume.pdf' to any desired filename
  };

  return (
    <div>
      {/* Your other UI elements */}
      {pdfData && (
        <button onClick={downloadPdf}>
          Download PDF
        </button>
      )}
    </div>
  );
};
export default Mus;