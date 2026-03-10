const input = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

let suggestions = [];
let activeIndex = -1;


function debounce(fn, delay){
    let timer;

    return function(...args){
        clearTimeout(timer);

        timer = setTimeout(()=> {
            fn.apply(this,args);
        },delay)
    }
}

async function fetchUsers(query){

    if(!query){
        suggestionsBox.innerHTML = '';
        return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    suggestions = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));

    renderSuggestions();
}