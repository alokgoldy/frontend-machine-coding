

function init() {
    const firstStar = document.getElementById('first-star');
    const secondStar = document.getElementById('second-star');
    const thirdStar = document.getElementById('third-star');
    const fourthStar = document.getElementById('fourth-star');
    const fifthStar = document.getElementById('fifth-star');
    // let totalClicked = 0;

    firstStar.addEventListener('click', () => {
        firstStar.classList.toggle('clicked');
        // totalClicked++;
    })
    secondStar.addEventListener('click', () => {
        secondStar.classList.toggle('clicked');
        // totalClicked++;
    })
    thirdStar.addEventListener('click', () => {
        thirdStar.classList.toggle('clicked');
        // totalClicked++;
    })
    fourthStar.addEventListener('click', () => {
        fourthStar.classList.toggle('clicked');
        // totalClicked++;
    })
    fifthStar.addEventListener('click', () => {
        fifthStar.classList.toggle('clicked');
        // totalClicked++;
    })
}

init()

