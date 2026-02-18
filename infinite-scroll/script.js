const list = document.getElementById('list');
const loader = document.querySelector('.loader');

let page = 1;
let isLoading = false;


function fakeApi(page) {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = Array.from({ length: 10 }, (_, i) => {
                return `Item ${(page - 1) * 10 + i + 1}`;
            });
            resolve(data);
        }, 2000)
    })
}

async function loadMore() {
    if (isLoading) return;

    isLoading = true;
    loader.style.display = 'block';

    try {
        const data = await fakeApi(page);
        let continueLoading = true;
        while (continueLoading) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.classList.add('item');
                list.appendChild(div);
            })
            page++;
            console.log('before - document body', {
                bodyOffset: document.body.offsetHeight,
                innerHeight: window.innerHeight
            })
            if (document.body.offsetHeight > window.innerHeight) {
                console.log('after - document body', {
                    bodyOffset: document.body.offsetHeight,
                    innerHeight: window.innerHeight
                })
                continueLoading = false;
            }
        }

    } catch (err) {
        console.log('my error', err);
    } finally {
        isLoading = false;
        loader.style.display = 'none';
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        loadMore();
    }
})

loadMore()