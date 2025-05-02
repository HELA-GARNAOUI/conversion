import React, { useState } from 'react';
import UploadForm from './component/UploadForm';
import './style.css';

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div className="container">
      <h1>Image to Text Converter</h1>
      <UploadForm onResult={handleResult} />
      {result && (
        <div className="result">
          <h2>Text:</h2>
          <p>{result.text}</p>
          <h2>Language:</h2>
          <p>{result.language}</p>
          <h2>Keywords:</h2>
          <ul>
            {result.keywords.map((keyword, i) => (
              <li key={i}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
