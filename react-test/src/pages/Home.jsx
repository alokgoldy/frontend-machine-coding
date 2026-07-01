import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/debouncedsearch">Debounced Search</Link>
      <br />
      <Link to="/nested-products">Nested Products</Link>
      <br />
      <Link to="/file-upload">File Upload with Progress Bar</Link>
      <br />
      <Link to="/simple-file-upload">Simple File Upload</Link>
      <br />
      <Link to="/data-table">Data Table with Sorting and Filtering</Link>
    </div>
  );
}

export default Home;
