import { useState } from 'react';
import MyProductList from './myComponents/MyProductList';
import { myProducts } from './myData';

function MyApp() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState('NONE');
  const sortedProducts = [...myProducts];

  let finalProducts =
    category === 'ALL'
      ? [...sortedProducts]
      : [...sortedProducts.filter((item) => item.category === category)];

  finalProducts =
    search !== ''
      ? finalProducts.filter((item) =>
          item.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
        )
      : finalProducts;

  if (sort !== 'NONE') {
    finalProducts = [...finalProducts].sort((a, b) =>
      sort === 'LOW_HIGH' ? a.price - b.price : b.price - a.price
    );
  }

  return (
    <div className="my-app">
      <h3>Product List</h3>
      <input
        type="text"
        value={search}
        placeholder={'Search Products'}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ALL">ALL</option>
        <option value="Mobile">Mobile</option>
        <option value="Laptop">Laptop</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="NONE">NONE</option>
        <option value="HIGH_LOW">HIGH-LOW</option>
        <option value="LOW_HIGH">LOW-HIGH</option>
      </select>
      <MyProductList myProducts={finalProducts} />
    </div>
  );
}

export default MyApp;
