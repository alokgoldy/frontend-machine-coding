const input = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

let suggestions = [];


function showSuggestions() {
  suggestionsBox.innerHTML = '';

  suggestions.forEach((user, index) => {

    const div = document.createElement('div');
    div.classList.add('suggestion-item');
    div.innerText = user.name;

    div.addEventListener('click', ()=>{
      input.value = user.name;
      suggestionsBox.innerHTML = ''
    })
    suggestionsBox.appendChild(div);
  })
}

async function searchUser(query) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  console.log('fetched data', data);
  suggestions = (data.filter(i => i.name.toLowerCase().includes(query.toLowerCase())));
  console.log(suggestions);
  showSuggestions();

}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }

}
const delayFn = debounce(searchUser, 500);
input.addEventListener('input', (e) => {
  delayFn(e.target.value);
})