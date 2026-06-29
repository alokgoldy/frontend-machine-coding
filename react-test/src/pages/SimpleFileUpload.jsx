import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function getFileSize(bytes) {
  if (!bytes) return '0 Bytes';

  if (bytes < 1024) return `${bytes} Bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
  },
  title: {
    fontSize: '24px',
    color: '#0f172a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#475569',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    marginBottom: '16px',
  },
  fileBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '16px',
  },
  button: {
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '16px',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  progressText: {
    color: '#334155',
    marginBottom: '8px',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e2e8f0',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  progressFill: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: '#2563eb',
  }),
  message: {
    color: '#0f172a',
    marginBottom: '16px',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default function SimpleFileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('Choose a file and click upload.');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setFile(selectedFile);
    setProgress(0);
    setIsUploading(false);
    setMessage(
      selectedFile
        ? `Selected: ${selectedFile.name}`
        : 'Choose a file and click upload.'
    );
  };

  const handleUpload = () => {
    if (!file || isUploading) return;

    setProgress(0);
    setIsUploading(true);
    setMessage(`Uploading "${file.name}"...`);

    timerRef.current = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 20, 100);

        if (next === 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsUploading(false);
          setMessage(`File "${file.name}" uploaded successfully.`);
        }

        return next;
      });
    }, 300);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Simple File Upload</h1>
        <p style={styles.subtitle}>
          Basic version for interview practice.
        </p>

        <input type="file" onChange={handleFileChange} style={styles.input} />

        {file && (
          <div style={styles.fileBox}>
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {getFileSize(file.size)}</p>
            <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
          </div>
        )}

        {file && (
          <>
            <p style={styles.progressText}>Progress: {progress}%</p>
            <div style={styles.progressBar}>
              <div style={styles.progressFill(progress)} />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          style={{
            ...styles.button,
            ...(!file || isUploading ? styles.disabledButton : {}),
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>

        <p style={styles.message}>{message}</p>

        <Link to="/" style={styles.link}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
