const totalPages = 20;
let currentPage = 1;

const paginationContainer = document.getElementById("pagination-container");

function getPages() {
  const pages = [];

  // Always show first page
  pages.push(1);

  // Left dots
  if (currentPage > 3) {
    pages.push("...");
  }

  // Middle pages
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  // Right dots
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

function handlePageClick(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = "";

  // Prev Button
  const prevBtn = document.createElement("button");
  prevBtn.className = "pagination-btn nav-btn";
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => handlePageClick(currentPage - 1));
  paginationContainer.appendChild(prevBtn);

  // Page Buttons & Dots
  const pages = getPages();
  pages.forEach((page) => {
    if (page === "...") {
      const dots = document.createElement("span");
      dots.className = "pagination-dots";
      dots.textContent = "...";
      paginationContainer.appendChild(dots);
    } else {
      const pageBtn = document.createElement("button");
      pageBtn.className = `pagination-btn ${currentPage === page ? "active" : ""}`;
      pageBtn.textContent = page;
      pageBtn.addEventListener("click", () => handlePageClick(page));
      paginationContainer.appendChild(pageBtn);
    }
  });

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.className = "pagination-btn nav-btn";
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => handlePageClick(currentPage + 1));
  paginationContainer.appendChild(nextBtn);
}

// Initial Render
renderPagination();