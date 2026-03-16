import { useState, useCallback, useMemo } from 'react';

function debounce(fn, delay) {
  let timer;

  return function (value) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(value);
    }, delay);
  };
}

export default function AutoComplete() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const searchUsers = useCallback(async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(query.toLowerCase());
    });

    setSuggestions(filtered);
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(searchUsers, 500),
    [searchUsers]
  );

  const handleChange = (e) => {
    setText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSelect = (name) => {
    setText(name);
    setSuggestions([]);
  };

  return (
    <div className="a-container">
      <div className="a-search-bar">
        <input
          placeholder="Search users"
          onChange={handleChange}
          value={text}
          className="a-search-input"
        />
        {suggestions.length > 0 && (
          <div className="a-suggestions">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="a-suggestions-user"
                onClick={() => handleSelect(user.name)}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
