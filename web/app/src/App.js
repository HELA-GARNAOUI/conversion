import React, { useState } from 'react';
import UploadForm from './component/UploadForm';
import './style.css';

function App() {
  const [result, setResult] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    const textFile = new Blob(
      [`Detected Language: ${data.language}\n\n${data.text}\n\nKeywords:\n${data.keywords.join(', ')}`],
      { type: 'text/plain' }
    );
    setDownloadUrl(URL.createObjectURL(textFile));
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Image to Text Converter</h1>
      </nav>

      <div className="container">
        <UploadForm onResult={handleResult} />

        {result && (
          <div className="card">
            <h3>Detected Language: {result.language}</h3>
            <p><strong>Text:</strong></p>
            <p>{result.text}</p>
            <p><strong>Keywords:</strong> {result.keywords.join(', ')}</p>

            {downloadUrl && (
              <a href={downloadUrl} download="converted_result.txt" className="download-btn">
                Download Result
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
