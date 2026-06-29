import { useEffect, useRef, useState } from "react";
import '../styles/test.css'

export default function Test() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('Choose a file and click upload.');
  const timerRef = useRef(null);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
  }

  const handleUpload = () => {

  }
  return (
    <div className="page">
      <div className="card">
        <h1> Simple File Upload</h1>
        <p>Basic Version for interview practice.</p>

        <input type="file" onChange={handleFileChange} />

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>

        <p>{message}</p>
      </div>
    </div>
  )
}