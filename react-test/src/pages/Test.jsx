import { useState, useEffect } from 'react';


const Test = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    debugger
    const searchValue = e.target.value
    setValue(searchValue);
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const filtered = users.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      console.log('inspect@1', {
        filtered
      })
      setList(filtered);
    }, 1000)

    return () => clearTimeout(timerId);

  }, [value, users])

  return (
    <div className='test-debounce-container'>
      <div className='test-debounce-input-container'>
        <input
          name='name'
          label='Enter name to search'
          onChange={handleChange}
          type='text'
          value={value}
          className='test-debounce-input'
        />
      </div>
      <ul>
        {list?.map(item => (<li key={item.id}>{item.name}</li>))}
      </ul>
    </div>
  )
}

export default Test;