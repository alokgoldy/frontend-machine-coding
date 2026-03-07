import { useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type={'text'}
        placeholder={'Search Superheroes...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type={'submit'}>Submit</button>
    </form>
  )
}

export default SearchBar
