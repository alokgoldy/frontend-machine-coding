import { useState } from 'react'
import { searchHeroes } from '../api/superheroApi'
import SearchBar from '../components/SearchBar'
import HeroCard from '../components/HeroCard'

function Home() {
  const [heroes, setHeroes] = useState([])

  const handleSearch = async (query) => {
    const results = await searchHeroes(query)
    setHeroes(results || [])
  }

  return (
    <div className="container">
      <h1>SuperHero Arena</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="heroes-grid">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  )
}

export default Home
