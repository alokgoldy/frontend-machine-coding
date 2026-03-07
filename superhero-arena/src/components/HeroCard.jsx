import '../styles/heroCard.css'

function HeroCard({ hero }) {
  return (
    <div className="hero-card">
      <img src={hero.image.url} alt={hero.name} />
      <h3>{hero.name}</h3>
      <p>{hero.biography.publisher}</p>

      <button>Compare</button>
    </div>
  )
}

export default HeroCard
