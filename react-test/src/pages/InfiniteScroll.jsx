import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/infinite-scroll.css'

function InfiniteScroll() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const controller = useRef(null);

    const listItemRef = useCallback((node) => {
        if (loading) return;

        if (controller.current) controller.current.disconnect();

        controller.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })

        if (node) controller.current.observe(node);
    }, [hasMore, loading]);

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
            console.log('Error while fetching data', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems(page);
    }, [page])


    return (<div className='container'>
        <h2>Infinite Scroll</h2>
        <div className='list'>
            {items.map((item, index) => {
                if (index + 1 === items.length) {
                    return (<div key={item.id} className='card' ref={listItemRef}>
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
        {loading && <p>Loading data...</p>}
        {!hasMore && <p>No more data to load...</p>}
    </div>)
}

export default InfiniteScroll;