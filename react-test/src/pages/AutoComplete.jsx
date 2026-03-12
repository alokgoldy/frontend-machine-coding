import { useState } from "react";

function debounce(fn,delay){
    let timer;

    return function(value){
        clearTimeout(timer);

        timer = setTimeout(()=>{
            fn(value);
        }, delay)
    }
}

export default function AutoComplete(){
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    async function searchUsers(query){

        if(!query){
            setSuggestions([]);
            return;
        }

        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();

        const filtered = users.filter(user => {
            return user.name.toLowerCase().includes(query.toLowerCase());
        });

        setSuggestions(filtered);
    }

    const debouncedSearch = debounce(searchUsers, 500);

    const handlechnage = (e)=>{
        setText(e.target.value);
        debouncedSearch(e.target.value);
    }

    const handleSelect = (name)=>{
        setText(name)
    }

    return(
        <div style={{width: '300px', margin: '40px'}}>
            <input
                placeholder="Search users"
                onChange={handlechnage}
                value={text}
                style={{width: '100%', padding: '8px'}}
            />
            <div style={{border: "1px solid #ccc"}}>
                {suggestions.map((user)=>{
                    <div 
                    key={user.id} 
                    style={{padding: '8px', cursor:'pointer'}}
                    onClick={() => handleSelect(user.name)}
                    >
                        {user.name}
                    </div>
                })}
            </div>
        </div>
    )
}