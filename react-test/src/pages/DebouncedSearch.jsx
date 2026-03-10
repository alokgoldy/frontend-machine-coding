import { useState, useEffect, useRef } from 'react';

function DebouncedSearch() {
    const [search,setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [suggetions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSelected, setIsselected] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
                setSuggestions([]);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown');
    }, [])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsers(data));
    },[])

    useEffect(() =>{
        const timerId = setTimeout(()=> {
            if(search && !isSelected){
                const filtered = users.filter((user) => {
                return user.name.toLowerCase().includes(search.toLowerCase());
                })
                setSuggestions(filtered);
            } else {
                setSuggestions([]);
            }
        }, 500);
        
        return () => clearTimeout(timerId);
    }, [search, users, isSelected])

    const handleSelect = (user) => {
        setSuggestions([]);
        setSelectedUser(user);
        setSearch(user.name);
        setIsselected(true)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        setIsselected(false);
    }

    return(
        <div className='d-container'>
            <div ref={wrapperRef} className='d-search-bar'>
                <input
                    placeholder='Search users ...'
                    onChange={handleChange}
                    type='text'
                    className='d-search-input'
                    value={search}
                />
                {suggetions.length > 0 && (
                    <div className='d-suggestions'>
                        {suggetions.map((user) =>(
                            <div
                            key={user.id}
                            className='d-suggestions-user'
                            onClick={() => handleSelect(user)}
                            >
                                {user.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedUser && (
                <div style={{ marginTop: "20px" }}>
                    <h3>{selectedUser.name}</h3>
                    <p>Email: {selectedUser.email}</p>
                    <p>Phone: {selectedUser.phone}</p>
                    <p>Website: {selectedUser.website}</p>
                </div>
            )}
        </div>
    )
}

export default DebouncedSearch;