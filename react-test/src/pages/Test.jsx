import { useState, useMemo, useCallback, useEffect } from 'react';

function debounce(fn, delay) {
  let timerId;

  return function (value) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(value);
    }, delay)
  }
}

export default function Test() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const callApi = useCallback(async (query) => {

    if (!query) {
      setSuggestions([]);
      return
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await res.json();

    const filtered = data.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

    setSuggestions(filtered)

    console.log('calling api....', query);
  }, [])

  const debouncedSearch = useMemo(() => {
    return debounce(callApi, 500)
  }, [callApi]);

  const handleChange = (e) => {
    const sValue = e.target.value
    setSearch(sValue);
    console.log('handle search', sValue);
    debouncedSearch(sValue);
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     callApi(search);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [search, callApi])

  return (
    <div className='ac-container'>
      <div className='ac-input-container'>
        <h2>Auto Complete</h2>
        <input
          type='text'
          label='Search'
          value={search}
          onChange={handleChange}
        />
        {suggestions.length > 0 &&
          (<div className='ac-sgs-cn'>
            <ul>
              {suggestions.map(i => <li key={i.id}>
                {i.name}
              </li>)}
            </ul>
          </div>)}
      </div>
    </div>
  )
}