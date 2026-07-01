import { useState } from 'react';
import { Link } from 'react-router-dom';

const employees = [
  { id: 1, name: 'Amit Sharma', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Neha Verma', department: 'Design', salary: 72000 },
  { id: 3, name: 'Rohit Gupta', department: 'Product', salary: 91000 },
  { id: 4, name: 'Priya Singh', department: 'Engineering', salary: 88000 },
  { id: 5, name: 'Karan Mehta', department: 'HR', salary: 60000 },
];

const departments = ['All', 'Engineering', 'Design', 'Product', 'HR'];

const styles = {
  page: {
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
  },
  heading: {
    marginBottom: '8px',
    color: '#0f172a',
  },
  subheading: {
    marginBottom: '16px',
    color: '#475569',
  },
  input: {
    width: '100%',
    maxWidth: '320px',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  select: {
    width: '100%',
    maxWidth: '220px',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '16px',
  },
  th: {
    border: '1px solid #e2e8f0',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f1f5f9',
    cursor: 'pointer',
  },
  td: {
    border: '1px solid #e2e8f0',
    padding: '12px',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
  },
  helper: {
    marginBottom: '16px',
    color: '#334155',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default function DataTable() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = search.toLowerCase();
    const matchesDepartment =
      department === 'All' || employee.department === department;
    const matchesSearch =
      employee.name.toLowerCase().includes(searchValue) ||
      employee.department.toLowerCase().includes(searchValue);

    return matchesDepartment && matchesSearch;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const firstValue = a[sortConfig.key];
    const secondValue = b[sortConfig.key];

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return sortConfig.direction === 'asc'
        ? firstValue - secondValue
        : secondValue - firstValue;
    }

    return sortConfig.direction === 'asc'
      ? String(firstValue).localeCompare(String(secondValue))
      : String(secondValue).localeCompare(String(firstValue));
  });

  const getArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Data Table</h1>
        <p style={styles.subheading}>
          Simple interview version with filtering and sorting.
        </p>

        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search by name or department"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={styles.input}
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            style={styles.select}
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p style={styles.helper}>
          Search by text, filter by department, and click a header to sort.
        </p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => handleSort('name')}>
                Name{getArrow('name')}
              </th>
              <th style={styles.th} onClick={() => handleSort('department')}>
                Department{getArrow('department')}
              </th>
              <th style={styles.th} onClick={() => handleSort('salary')}>
                Salary{getArrow('salary')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td style={styles.td}>{employee.name}</td>
                  <td style={styles.td}>{employee.department}</td>
                  <td style={styles.td}>${employee.salary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ ...styles.td, ...styles.empty }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Link to="/" style={styles.link}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
