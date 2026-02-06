export const fetchProducts = ({ page, limit, search, sort }) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let data = Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                name: `Product_${i}`,
                price: Math.floor(Math.random() * 1000)
            }))

            if (search) {
                data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
            }

            if (sort === 'HIGH') {
                data.sort((a, b) => b.price - a.price);
            }

            if (sort === 'LOW') {
                data.sort((a, b) => a.price - b.price);
            }

            const start = (page - 1) * limit;
            const items = data.slice(start, start + limit);

            resolve({ items, total: data.length });
        }, 800)
    })
}