const paginationContainer = document.getElementById('paginationContainer');

const totalPages = 20;
let currentPage = 1;

function getPages() {

  const pages = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...')
  }
}

function renderPagination() {
  paginationContainer.innerHTML = "";

  // Prev Button
  const prevButton = document.createElement('button');
  prevButton.className = 'pagination-btn';
  prevButton.textContent = 'Prev';
  prevButton.disabled = currentPage === 1;

  paginationContainer.appendChild(prevButton);

  const pages = getPages();


  // Next Button
  const nextButton = document.createElement('button');
  nextButton.className = 'pagination-btn';
  nextButton.textContent = 'Next';

  paginationContainer.appendChild(nextButton);
}

renderPagination();
