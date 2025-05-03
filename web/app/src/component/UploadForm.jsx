import React, { useState } from 'react';

const UploadForm = ({ onResult }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/convert', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      onResult(data);
    } else {
      alert('Upload or conversion failed.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
