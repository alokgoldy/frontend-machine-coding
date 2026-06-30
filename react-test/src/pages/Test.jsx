import { useState, useEffect, useRef } from 'react';
import '../styles/test.css';

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
    console.log('hey...')
  }

  return (
    <div className='page'>
      <div className='card'>
        <h1 className='title'>Simple File Upload</h1>
        <p className='subtitle'>Basic version for interview practice.</p>

        <input type='file' onChange={handleFileChange} className='file-input' />

        {file && (
          <div className='file-box'>
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {file.name}</p>
            <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
          </div>
        )}

        <button
          type='button'
          onClick={handleUpload}
          disabled={!file || isUploading}
          className='upload-btn'
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
    </div>
  )
}