import { useState } from 'react';


const departments = ['All', 'Engineering', 'Design', 'Product', 'HR'];

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
    marginBottom: '8px',
    color: '#0f172a',
  },
  subheading: {
    marginBottom: '16px',
    color: '#475569'
  },
  controls: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    maxWidth: '320px',
    padding: '10px',
    margingBottom: '16px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px'
  },
  select: {
    width: '100%',
    maxWidth: '320px',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#ffffff'
  },
  

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
        <p style={styles.subheading}>
          Simple interview version with filtering and sorting
        </p>

        <div style={styles.controls}>
          <input
            type='text'
            placeholder='Search by name or department'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={styles.input}
          />

          <select
            value={department}
            onChange={event => setDepartment(event.target.value)}
            style={styles.select}
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}