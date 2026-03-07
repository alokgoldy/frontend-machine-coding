export const searchHeroes = async (query) => {
  const response = await fetch(
    `https://www.superheroapi.com/api.php/e4714081bd7143259982b0c8c85dfd34/search/${query}`
  )
  const data = await response.json()
  return data.results || []
}
