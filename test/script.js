const loader = document.getElementById('loader');
const list = document.getElementById('list');

let page = 1;
let isLoading = false;

function fakeApi(page) {
    return new Promise(resolve => {
        let data
        setTimeout(() => {
            data = Array.from({ length: 10 }, (_, idx) => {
                return `This is data ${(page - 1) * 10 + idx + 1}`;
            })
            resolve(data);
        }, 1000)

    })
}

async function loadMore() {
    if (isLoading) return;

    isLoading = true;
    loader.style.display = 'block';

    try {

        let data = await fakeApi(page);
        let continueLoading = true;
        while (continueLoading) {
            data = await fakeApi(page);
            data.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.classList.add('item');
                list.appendChild(div);
            })
            page++;
            if (document.body.offsetHeight > window.innerHeight) {
                continueLoading = false;
            }
        }

    } catch (err) {
        console.log(err);
    } finally {
        isLoading = false;
        loader.style.display = 'none';
    }

}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 10) {
        loadMore()
    }
})

loadMore()