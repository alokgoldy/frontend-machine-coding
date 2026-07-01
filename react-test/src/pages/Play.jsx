import { useState } from 'react';


const styles = {
  page: {
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif'
  },
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px'
  },
  heading: {
    margingBottom: '8px',
    color: '#0f172a',
  },
  subheading: {
    margingBottom: '16px',
    color: '#475569'
  }
}

export default function Play() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  })

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}> Data Table</h1>
        <p style={styles.sybheading}>
          Simple interview version with filtering and sorting
        </p>

      </div>
    </div>
  )
}