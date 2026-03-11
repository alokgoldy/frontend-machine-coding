const input = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

let suggestions = [];
// let activeIndex = -1;


function debounce(fn, delay){
    let timer;

    return function(...args){
        console.log('inpect@1', {
            timer, args
        })
        clearTimeout(timer);

        timer = setTimeout(()=> {
            fn.apply(this,args);
        },delay)
    }
}


function renderSuggestions(){
    suggestionsBox.innerHTML = '';

    suggestions.forEach((user, index) => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.innerText = user.name;

        div.addEventListener('click', ()=>{
            input.value = user.name;
            suggestionsBox.innerHTML = '';
        })

        suggestionsBox.appendChild(div);
    })
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

// const debouncedSearch = debounce(fetchUsers, 500);

// input.addEventListener('input', (e)=>{
// debouncedSearch(e.target.value);
// })

function myDebounce(fn, delay){
    let mytimer;

    return function(...args){
        clearTimeout(mytimer);
        mytimer = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    }
}

function myDebounce2(fn, delay){
    let mtimer;

    return function(...args){
        clearTimeout(mtimer);
        mtimer = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    }
}

const myDebouncedSearch = myDebounce(fetchUsers, 500);


input.addEventListener('input', (e)=>{
    myDebouncedSearch(e.target.value);
})