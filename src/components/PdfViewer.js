import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

const PdfViewer = ({jobId}) => {
  const [open,setOpen]=useState(false);
  const [applications, setApplications] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bytesfarms/resume/get?jobPositionId=${jobId}`);
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching application data', error);
      }
    };

    fetchData();
  }, []);

  const downloadPdf = (pdfData) => {
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, 'resume.pdf');
  };

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id}>
          <h2>Job Position: {application.jobPosition.title}</h2>
          <p>User: {application.user.username}</p>
          <p>Email: {application.user.email}</p>

          {application.fileData && (
            <button onClick={() => downloadPdf(application.fileData)}>
              Download PDF
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PdfViewer;
