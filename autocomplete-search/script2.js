const searchInput = document.getElementById('searchInput');
const suggestionBox = document.getElementById('suggestions');


let suggestions = [];

function debounce(fn,delay){
    let timer;

    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
               fn.apply(this,args)
            }, delay)
    }
}

function renderSuggestions(){
    
    suggestionBox.innerHTML = '';

    suggestions.forEach((user)=>{
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.innerText = user.name;

        div.addEventListener('click', ()=>{
            searchInput.value = user.name
            suggestionBox.innerHTML = ''
        })
        suggestionBox.appendChild(div);
    })
}

async function fetchUsers(query){

    if(!query){
        suggestionBox.innerHTML = '';
        return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    suggestions = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

    renderSuggestions()
}

const debouncedFn = debounce(fetchUsers, 500);

searchInput.addEventListener('input', (e)=>{
    debouncedFn(e.target.value);
})