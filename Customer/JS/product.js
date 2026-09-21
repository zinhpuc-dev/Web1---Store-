/* ==================================================
   LẤY PHẦN TỬ HTML
================================================== */

const products = Array.from(document.querySelectorAll(".product-card"));

const productList = document.getElementById("productList");

const productCount = document.getElementById("productCount");

const noProduct = document.getElementById("noProduct");

const clearFilter = document.getElementById("clearFilter");

const sortProduct = document.getElementById("sortProduct");

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

/* FILTER */

const categoryFilters = document.querySelectorAll('input[name="category"]');

const brandFilters = document.querySelectorAll('input[name="brand"]');

const inStock = document.getElementById("inStock");

/* GIÁ */

const priceOptions = document.querySelectorAll(".price-filter");

let selectedPrice = "";

/* ==================================================
   PHÂN TRANG
================================================== */

const productsPerPage = 6;

let currentPage = 1;

let filteredProducts = [...products];

const pagination = document.getElementById("pagination");

const pageNumbers = document.getElementById("pageNumbers");

const prevPage = document.getElementById("prevPage");

const nextPage = document.getElementById("nextPage");

/* ==================================================
   LẤY GIÁ
================================================== */

function getProductPrice(product) {
  return Number(product.dataset.price);
}

/* ==================================================
   KIỂM TRA GIÁ
================================================== */

function checkPrice(price, selectedPrice) {
  if (selectedPrice === "under1") {
    return price < 1000000;
  }

  if (selectedPrice === "1to3") {
    return price >= 1000000 && price <= 3000000;
  }

  if (selectedPrice === "3to5") {
    return price > 3000000 && price <= 5000000;
  }

  if (selectedPrice === "over5") {
    return price > 5000000;
  }

  return true;
}

/* ==================================================
   LỌC SẢN PHẨM
================================================== */

function filterProducts() {
  /* ----------------------------------------------
       LOẠI
    ---------------------------------------------- */

  const selectedCategories = [];

  categoryFilters.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    }
  });

  /* ----------------------------------------------
       HÃNG
    ---------------------------------------------- */

  const selectedBrands = [];

  brandFilters.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedBrands.push(checkbox.value);
    }
  });

  /* ----------------------------------------------
       TÌM KIẾM
    ---------------------------------------------- */

  const keyword = searchInput.value.trim().toLowerCase();

  /* ----------------------------------------------
       LỌC
    ---------------------------------------------- */

  filteredProducts = products.filter(function (product) {
    const category = product.dataset.category;

    const brand = product.dataset.brand;

    const price = getProductPrice(product);

    const stock = product.dataset.stock === "true";

    const productName = product.querySelector("h3").textContent.toLowerCase();

    /* LOẠI */

    let categoryMatch = true;

    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(category);
    }

    /* HÃNG */

    let brandMatch = true;

    if (selectedBrands.length > 0) {
      brandMatch = selectedBrands.includes(brand);
    }

    /* GIÁ */

    let priceMatch = true;

    if (selectedPrice !== "") {
      priceMatch = checkPrice(price, selectedPrice);
    }

    /* TỒN KHO */

    let stockMatch = true;

    if (inStock.checked) {
      stockMatch = stock;
    }

    /* TÌM KIẾM */

    let searchMatch = true;

    if (keyword !== "") {
      searchMatch = productName.includes(keyword);
    }

    return (
      categoryMatch && brandMatch && priceMatch && stockMatch && searchMatch
    );
  });

  /* ----------------------------------------------
       VỀ TRANG 1 SAU KHI LỌC
    ---------------------------------------------- */

  currentPage = 1;

  /* HIỂN THỊ */

  displayProducts();
}

/* ==================================================
   HIỂN THỊ SẢN PHẨM
================================================== */

function displayProducts() {
  /* ----------------------------------------------
       XÓA SẢN PHẨM KHÔNG THUỘC KẾT QUẢ
    ---------------------------------------------- */

  products.forEach(function (product) {
    product.style.display = "none";
  });

  /* ----------------------------------------------
       TÍNH SỐ TRANG
    ---------------------------------------------- */

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  /* ----------------------------------------------
       KHÔNG CÓ SẢN PHẨM
    ---------------------------------------------- */

  if (filteredProducts.length === 0) {
    productCount.textContent = "Không có sản phẩm phù hợp";

    noProduct.style.display = "block";

    pagination.style.display = "none";

    return;
  }

  noProduct.style.display = "none";

  pagination.style.display = "flex";

  /* ----------------------------------------------
       KIỂM TRA TRANG
    ---------------------------------------------- */

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /* ----------------------------------------------
       VỊ TRÍ SẢN PHẨM
    ---------------------------------------------- */

  const start = (currentPage - 1) * productsPerPage;

  const end = start + productsPerPage;

  const productsToShow = filteredProducts.slice(start, end);

  /* ----------------------------------------------
       HIỂN THỊ
    ---------------------------------------------- */

  productsToShow.forEach(function (product) {
    product.style.display = "";
  });

  /* ----------------------------------------------
       SỐ LƯỢNG
    ---------------------------------------------- */

  productCount.textContent =
    "Hiển thị " + filteredProducts.length + " sản phẩm";

  /* ----------------------------------------------
       TẠO SỐ TRANG
    ---------------------------------------------- */

  createPagination(totalPages);
}

/* ==================================================
   TẠO PHÂN TRANG
================================================== */

function createPagination(totalPages) {
  pageNumbers.innerHTML = "";

  /* ----------------------------------------------
       NÚT TRƯỚC
    ---------------------------------------------- */

  prevPage.disabled = currentPage === 1;

  /* ----------------------------------------------
       SỐ TRANG
    ---------------------------------------------- */

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");

    button.classList.add("page-number");

    button.textContent = i;

    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      currentPage = i;

      displayProducts();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    pageNumbers.appendChild(button);
  }

  /* ----------------------------------------------
       NÚT SAU
    ---------------------------------------------- */

  nextPage.disabled = currentPage === totalPages;
}

/* ==================================================
   NÚT TRANG TRƯỚC
================================================== */

prevPage.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;

    displayProducts();
  }
});

/* ==================================================
   NÚT TRANG SAU
================================================== */

nextPage.addEventListener("click", function () {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (currentPage < totalPages) {
    currentPage++;

    displayProducts();
  }
});

/* ==================================================
   LỌC GIÁ
================================================== */

priceOptions.forEach(function (button) {
  button.addEventListener("click", function () {
    const price = button.dataset.price;

    /* BẤM LẠI NÚT ĐANG CHỌN → BỎ LỌC */

    if (selectedPrice === price) {
      selectedPrice = "";

      button.classList.remove("active");
    } else {
      /* CHỌN MỘT KHOẢNG GIÁ KHÁC */
      selectedPrice = price;

      priceOptions.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
    }

    filterProducts();
  });
});

/* ==================================================
   FILTER LOẠI
================================================== */

categoryFilters.forEach(function (checkbox) {
  checkbox.addEventListener("change", filterProducts);
});

/* ==================================================
   FILTER HÃNG
================================================== */

brandFilters.forEach(function (checkbox) {
  checkbox.addEventListener("change", filterProducts);
});

/* ==================================================
   FILTER CÒN HÀNG
================================================== */

inStock.addEventListener("change", filterProducts);

/* ==================================================
   TÌM KIẾM
================================================== */

searchInput.addEventListener("input", filterProducts);

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  filterProducts();
});

/* ==================================================
   SẮP XẾP
================================================== */

sortProduct.addEventListener("change", function () {
  const sortType = sortProduct.value;

  if (sortType === "low") {
    filteredProducts.sort(function (a, b) {
      return getProductPrice(a) - getProductPrice(b);
    });
  }

  if (sortType === "high") {
    filteredProducts.sort(function (a, b) {
      return getProductPrice(b) - getProductPrice(a);
    });
  }

  if (sortType === "name") {
    filteredProducts.sort(function (a, b) {
      const nameA = a.querySelector("h3").textContent.trim();

      const nameB = b.querySelector("h3").textContent.trim();

      return nameA.localeCompare(nameB);
    });
  }

  currentPage = 1;

  displayProducts();
});

/* ==================================================
   XÓA TẤT CẢ BỘ LỌC
================================================== */

clearFilter.addEventListener("click", function () {
  /* LOẠI */

  categoryFilters.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  /* HÃNG */

  brandFilters.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  /* CÒN HÀNG */

  inStock.checked = false;

  /* GIÁ */

  selectedPrice = "";

  priceOptions.forEach(function (button) {
    button.classList.remove("active");
  });

  /* SEARCH */

  searchInput.value = "";

  /* SORT */

  sortProduct.value = "default";

  /* TRANG */

  currentPage = 1;

  /* HIỂN THỊ */

  filteredProducts = [...products];

  displayProducts();
});

/* ==================================================
   ACCOUNT / LOGOUT
================================================== */

const accountLink = document.getElementById("accountLink");

const logoutBtn = document.getElementById("logoutBtn");

const username = localStorage.getItem("username");

if (username) {
  accountLink.textContent = username;

  accountLink.href = "#";

  logoutBtn.style.display = "inline-block";
} else {
  accountLink.textContent = "Tài khoản";

  accountLink.href = "login.html";

  logoutBtn.style.display = "none";
}

/* ==================================================
   LOGOUT
================================================== */

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("username");

  localStorage.removeItem("rememberLogin");

  window.location.reload();
});

/* ==================================================
   KHỞI ĐỘNG
================================================== */

displayProducts();
