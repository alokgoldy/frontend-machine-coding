import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/intinite-scroll.css'


function InfiniteScroll() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef(null);

    const fetchItems = async (pageNumber) => {
        setLoading(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`);
            const data = await res.json();

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => [...prev, ...data]);
            }
        } catch (error) {
            console.log('Error fetching items', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems(page);
    }, [page])


    const lastItemRef = useCallback((node) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [hasMore, loading]);

    return (
        <div className='container'>
            <h2>Infinite Scroll</h2>

            <div className='list-items'>
                {items.map((item, index) => {
                    if (index + 1 === items.length) {
                        return (<div key={item.id} ref={lastItemRef} className='card'>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </div>)
                    }

                    return (<div key={item.id} className='card'>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>)
                })}
            </div>
            {loading && <p>Loading more items...</p>}
            {!hasMore && <p>No more items to load...</p>}
        </div>
    )


}

export default InfiniteScroll;