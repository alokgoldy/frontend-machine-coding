export const searchHeroes = async (query) => {
  const response = await fetch(
    `https://superheroapi.com/api/e4714081bd7143259982b0c8c85dfd34/search/${query}`
  )
  const data = await response.json()
  return data
}
