import React, { useState } from 'react';

const UploadForm = ({ onResult }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://127.0.0.1:5000/convert", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    console.log(data); // Should show text, language, keywords
  };
  

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
