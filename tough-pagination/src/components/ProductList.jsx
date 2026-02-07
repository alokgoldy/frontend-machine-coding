import { useEffect, useState, useCallback, useRef } from "react";
import { fetchProducts } from "../api/fetchProducts";

const LIMIT = 10;

export default function ProductList() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const debounceRef = useRef();

    const loadData = useCallback(async () => {
        setLoading(true);

        const res = await fetchProducts({
            page,
            limit: LIMIT
        });

        setData(res.items);
        setTotal(res.total);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSearch = e => {
        clearTimeout(debounceRef.current);
        const value = e.target.value;
        debounceRef.current = setTimeout(() => {
            setPage(1);
            setSearch(value);
            loadData(1);
        }, 500);
    }
    return (
        <div>
            <h2>Product List</h2>

            <input placeholder="Search..." onChange={handleSearch} />

            {data.map(item => (
                <div key={item.id}>
                    {item.name} - ₹{item.price}
                </div>
            ))}

            {loading && <p>Loading...</p>}
            <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
            >
                Prev
            </button>

            <span> Page {page} </span>

            <button
                disabled={page * LIMIT >= total}
                onClick={() => setPage(p => p + 1)}
            >
                Next
            </button>
        </div>
    );
}