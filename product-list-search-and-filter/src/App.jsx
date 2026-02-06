import { useState } from 'react';
import { products } from './data';
import ProductList from './components/ProductList';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  const filteredProducts = (products || []).filter((product) =>
    product?.name?.toLowerCase()?.includes(search?.toLowerCase()))
    .filter((product) => category === 'ALL' ? true : product.category === category)

  return (
    <div className='app'>
      <h1>Product List</h1>
      <input
        type='text'
        placeholder='Search Products...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value='ALL'>ALL</option>
        <option value='Mobile'>Mobile</option>
        <option value='Laptop'>Laptop</option>
      </select>
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default App;