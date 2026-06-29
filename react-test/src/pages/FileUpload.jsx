import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${sizes[index]}`;
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    background: '#ffffff',
    borderRadius: '18px',
    padding: '28px',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '8px',
    color: '#0f172a',
  },
  subtitle: {
    color: '#475569',
    marginBottom: '24px',
    lineHeight: 1.5,
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    background: '#f8fafc',
    marginBottom: '18px',
  },
  fileBox: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '18px',
  },
  fileName: {
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '6px',
    wordBreak: 'break-word',
  },
  fileMeta: {
    color: '#64748b',
    fontSize: '14px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: '#334155',
    fontSize: '14px',
  },
  progressTrack: {
    width: '100%',
    height: '14px',
    background: '#e2e8f0',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  progressFill: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    background: progress === 100 ? '#16a34a' : '#2563eb',
    transition: 'width 0.25s ease',
  }),
  status: {
    marginBottom: '18px',
    color: '#334155',
    fontSize: '14px',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    color: '#ffffff',
  },
  primary: {
    background: '#2563eb',
  },
  secondary: {
    background: '#ef4444',
  },
  neutral: {
    background: '#64748b',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  backLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [status, setStatus] = useState('Choose a file to begin.');
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const clearUploadTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => clearUploadTimer(), []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    clearUploadTimer();
    setSelectedFile(file);
    setProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setStatus(file ? `Ready to upload "${file.name}".` : 'Choose a file to begin.');
  };

  const startUpload = () => {
    if (!selectedFile || isUploading) return;

    const fileName = selectedFile.name;

    clearUploadTimer();
    setProgress(0);
    setIsUploading(true);
    setIsUploaded(false);
    setStatus(`Uploading "${fileName}"...`);

    timerRef.current = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + Math.floor(Math.random() * 18) + 8, 100);

        if (next >= 100) {
          clearUploadTimer();
          setIsUploading(false);
          setIsUploaded(true);
          setStatus(`"${fileName}" uploaded successfully.`);
        }

        return next;
      });
    }, 250);
  };

  const cancelUpload = () => {
    clearUploadTimer();
    setIsUploading(false);
    setIsUploaded(false);
    setStatus('Upload cancelled.');
  };

  const resetUpload = () => {
    clearUploadTimer();
    setSelectedFile(null);
    setProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setStatus('Choose a file to begin.');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>File Upload</h1>
        <p style={styles.subtitle}>
          Select a file and simulate an upload with a live progress bar.
        </p>

        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />

        {selectedFile && (
          <div style={styles.fileBox}>
            <div style={styles.fileName}>{selectedFile.name}</div>
            <div style={styles.fileMeta}>
              {selectedFile.type || 'Unknown file type'} {' • '}
              {formatFileSize(selectedFile.size)}
            </div>
          </div>
        )}

        {(selectedFile || isUploading || isUploaded) && (
          <>
            <div style={styles.progressHeader}>
              <span>Upload progress</span>
              <span>{progress}%</span>
            </div>

            <div style={styles.progressTrack} aria-label="Upload progress bar">
              <div style={styles.progressFill(progress)} />
            </div>
          </>
        )}

        <p style={styles.status}>{status}</p>

        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={startUpload}
            disabled={!selectedFile || isUploading}
            style={{
              ...styles.button,
              ...styles.primary,
              ...(!selectedFile || isUploading ? styles.disabled : {}),
            }}
          >
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </button>

          <button
            type="button"
            onClick={cancelUpload}
            disabled={!isUploading}
            style={{
              ...styles.button,
              ...styles.secondary,
              ...(!isUploading ? styles.disabled : {}),
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={resetUpload}
            style={{ ...styles.button, ...styles.neutral }}
          >
            Reset
          </button>
        </div>

        <Link to="/" style={styles.backLink}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
