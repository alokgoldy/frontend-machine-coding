import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nested-products.css';

const CATEGORY_TREE = {
  Electronics: {
    Computers: {
      Laptops: {
        Ultrabooks: {},
        'Gaming Laptops': {},
      },
      Accessories: {
        Keyboards: {},
        Monitors: {},
      },
    },
    Mobile: {
      Smartphones: {
        Android: {},
        iOS: {},
      },
      Audio: {
        Earbuds: {},
        Speakers: {},
      },
    },
  },
  Home: {
    Furniture: {
      Bedroom: {
        Beds: {},
        Wardrobes: {},
      },
      LivingRoom: {
        Sofas: {},
        CoffeeTables: {},
      },
    },
    Kitchen: {
      Appliances: {
        Mixers: {},
        Microwaves: {},
      },
      Storage: {
        Containers: {},
        Racks: {},
      },
    },
  },
  Fashion: {
    Men: {
      Clothing: {
        Shirts: {},
        Jackets: {},
      },
      Footwear: {
        Sneakers: {},
        Boots: {},
      },
    },
    Women: {
      Clothing: {
        Dresses: {},
        Tops: {},
      },
      Accessories: {
        Handbags: {},
        Watches: {},
      },
    },
  },
  Sports: {
    Fitness: {
      Strength: {
        Dumbbells: {},
        Benches: {},
      },
      Cardio: {
        Treadmills: {},
        Bikes: {},
      },
    },
    Outdoor: {
      Camping: {
        Tents: {},
        Lanterns: {},
      },
      Cycling: {
        Helmets: {},
        Gloves: {},
      },
    },
  },
};

const BRANDS = [
  'Nova',
  'Peak',
  'UrbanX',
  'Prime',
  'Vertex',
  'Nimbus',
  'Astra',
  'Pulse',
  'Orbit',
  'Luma',
];

const DESCRIPTORS = [
  'Core',
  'Elite',
  'Smart',
  'Plus',
  'Max',
  'Air',
  'Edge',
  'Flex',
  'Pro',
  'Ultra',
];

function collectLeafPaths(tree, trail = []) {
  return Object.entries(tree).flatMap(([name, childTree]) => {
    const nextTrail = [...trail, name];

    if (Object.keys(childTree).length === 0) {
      return [nextTrail];
    }

    return collectLeafPaths(childTree, nextTrail);
  });
}

function formatCategoryName(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function createProducts(total) {
  const paths = collectLeafPaths(CATEGORY_TREE);

  return Array.from({ length: total }, (_, index) => {
    const path = paths[index % paths.length];
    const brand = BRANDS[index % BRANDS.length];
    const descriptor = DESCRIPTORS[index % DESCRIPTORS.length];
    const categoryName = formatCategoryName(path[path.length - 1]);
    const price = 49 + ((index * 17) % 650);
    const stock = 10 + ((index * 9) % 140);
    const rating = (3 + ((index % 20) * 0.1)).toFixed(1);

    return {
      id: index + 1,
      sku: `SKU-${String(index + 1).padStart(4, '0')}`,
      name: `${brand} ${descriptor} ${categoryName}`,
      brand,
      price,
      stock,
      rating,
      categoryPath: path,
    };
  });
}

const PRODUCTS = createProducts(1000);
const MAX_VISIBLE_ROWS = 20;

function NestedProducts() {
  const [selectedCategories, setSelectedCategories] = useState(['', '', '', '']);

  const optionLevels = useMemo(() => {
    return selectedCategories.map((_, levelIndex) => {
      const matchingProducts = PRODUCTS.filter((product) =>
        selectedCategories.slice(0, levelIndex).every((selectedValue, selectedIndex) => {
          return !selectedValue || product.categoryPath[selectedIndex] === selectedValue;
        })
      );

      return [...new Set(matchingProducts.map((product) => product.categoryPath[levelIndex]).filter(Boolean))].sort();
    });
  }, [selectedCategories]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) =>
      selectedCategories.every((selectedValue, levelIndex) => {
        return !selectedValue || product.categoryPath[levelIndex] === selectedValue;
      })
    );
  }, [selectedCategories]);

  const handleCategoryChange = (levelIndex, value) => {
    setSelectedCategories((current) =>
      current.map((item, index) => {
        if (index < levelIndex) {
          return item;
        }

        if (index === levelIndex) {
          return value;
        }

        return '';
      })
    );
  };

  const resetFilters = () => {
    setSelectedCategories(['', '', '', '']);
  };

  const activePath = selectedCategories.filter(Boolean).map(formatCategoryName).join(' / ');

  return (
    <div className="nested-products-page">
      <div className="nested-products-shell">
        <div className="nested-products-header">
          <div>
            <p className="nested-products-eyebrow">React Test</p>
            <h1>Nested Product Category Grid</h1>
            <p className="nested-products-copy">
              Select categories level by level. Each selection filters the product grid
              and unlocks the next dropdown.
            </p>
          </div>
          <div className="nested-products-actions">
            <Link className="nested-products-link" to="/">
              Back Home
            </Link>
            <button className="nested-products-reset" type="button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="nested-products-toolbar">
          <div className="nested-products-stats">
            <div className="nested-products-stat-card">
              <span>Total Products</span>
              <strong>{PRODUCTS.length}</strong>
            </div>
            <div className="nested-products-stat-card">
              <span>Showing</span>
              <strong>{filteredProducts.length}</strong>
            </div>
            <div className="nested-products-stat-card">
              <span>Selected Path</span>
              <strong>{activePath || 'All Categories'}</strong>
            </div>
          </div>

          <div className="nested-products-filters">
            <div className="nested-products-filter">
              <label htmlFor="category-level-1">Category Level 1</label>
              <select
                id="category-level-1"
                value={selectedCategories[0]}
                onChange={(event) => handleCategoryChange(0, event.target.value)}
              >
                <option value="">All Top Categories</option>
                {optionLevels[0].map((option) => (
                  <option key={option} value={option}>
                    {formatCategoryName(option)}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategories[0] && optionLevels[1].length > 0 && (
              <div className="nested-products-filter">
                <label htmlFor="category-level-2">Category Level 2</label>
                <select
                  id="category-level-2"
                  value={selectedCategories[1]}
                  onChange={(event) => handleCategoryChange(1, event.target.value)}
                >
                  <option value="">All Level 2 Categories</option>
                  {optionLevels[1].map((option) => (
                    <option key={option} value={option}>
                      {formatCategoryName(option)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedCategories[1] && optionLevels[2].length > 0 && (
              <div className="nested-products-filter">
                <label htmlFor="category-level-3">Category Level 3</label>
                <select
                  id="category-level-3"
                  value={selectedCategories[2]}
                  onChange={(event) => handleCategoryChange(2, event.target.value)}
                >
                  <option value="">All Level 3 Categories</option>
                  {optionLevels[2].map((option) => (
                    <option key={option} value={option}>
                      {formatCategoryName(option)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedCategories[2] && optionLevels[3].length > 0 && (
              <div className="nested-products-filter">
                <label htmlFor="category-level-4">Category Level 4</label>
                <select
                  id="category-level-4"
                  value={selectedCategories[3]}
                  onChange={(event) => handleCategoryChange(3, event.target.value)}
                >
                  <option value="">All Level 4 Categories</option>
                  {optionLevels[3].map((option) => (
                    <option key={option} value={option}>
                      {formatCategoryName(option)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="nested-products-grid-wrap">
          <div className="nested-products-grid-meta">
            <span>Showing up to {MAX_VISIBLE_ROWS} rows at a time inside the scroll area.</span>
            <span>{filteredProducts.length} matching products</span>
          </div>
          <table className="nested-products-grid">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Category Path</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="nested-products-name-cell">
                      <strong>{product.name}</strong>
                      <span>{product.sku}</span>
                    </div>
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.categoryPath.map(formatCategoryName).join(' / ')}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NestedProducts;
