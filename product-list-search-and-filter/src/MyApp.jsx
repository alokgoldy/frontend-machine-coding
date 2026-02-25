import { useState, useMemo } from 'react';
import MyProductList from './myComponents/MyProductList';
import { myProducts } from './myData';
import useMyDebounce from './myHooks/useMyDebounce';

function MyApp() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState('NONE');
  const debouncedSearch = useMyDebounce(search, 300);

  // Derive categories dynamically
  const categories = useMemo(() => {
    const uniqueCategories = new Set(myProducts.map((p) => p.category));
    return ['ALL', ...uniqueCategories];
  }, []);

  const finalProducts = useMemo(() => {
    let products = [...myProducts];

    // Filter by category
    if (category !== 'ALL') {
      products = products.filter((item) => item.category === category);
    }

    // Filter by search
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLocaleLowerCase();
      products = products.filter((item) =>
        item.name.toLocaleLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sort !== 'NONE') {
      products.sort((a, b) =>
        sort === 'LOW_HIGH' ? a.price - b.price : b.price - a.price
      );
    }

    return products;
  }, [category, debouncedSearch, sort]);

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
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
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
