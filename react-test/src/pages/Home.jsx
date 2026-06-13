import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/debouncedsearch">Debounced Search</Link>
      <br />
      <Link to="/nested-products">Nested Products</Link>
    </div>
  );
}

export default Home;
