/* ========================================
   PRODUCT DETAIL
======================================== */

/* ================================
   LẤY PHẦN TỬ
================================ */

const quantityText = document.getElementById("quantity");

const minusBtn = document.getElementById("minusBtn");

const plusBtn = document.getElementById("plusBtn");

const addCartBtn = document.getElementById("addCartBtn");

const buyNowBtn = document.getElementById("buyNowBtn");

const cartMessage = document.getElementById("cartMessage");

/* ================================
   SẢN PHẨM
================================ */

const product = {
  id: "yonex-arcsaber-11-pro",

  name: "Yonex Arcsaber 11 Pro",

  brand: "YONEX",

  price: 5160000,

  image: "../HinhAnh/11-pro.webp",

  stock: 10,

  description:
    "Yonex Arcsaber 11 Pro là dòng vợt cầu lông cao cấp, phù hợp với người chơi yêu thích khả năng kiểm soát và cảm giác đánh ổn định.",
};

let quantity = 1;

/* ================================
   HIỂN THỊ
================================ */

document.getElementById("productName").textContent = product.name;

document.getElementById("productBrand").textContent = product.brand;

document.getElementById("productPrice").textContent =
  product.price.toLocaleString("vi-VN") + "đ";

document.getElementById("productImage").src = product.image;

document.getElementById("productImage").alt = product.name;

document.getElementById("productDescription").textContent = product.description;

document.getElementById("breadcrumbName").textContent = product.name;

/* ================================
   TĂNG SỐ LƯỢNG
================================ */

plusBtn.addEventListener("click", function () {
  if (quantity < product.stock) {
    quantity++;

    quantityText.textContent = quantity;
  }
});

/* ================================
   GIẢM SỐ LƯỢNG
================================ */

minusBtn.addEventListener("click", function () {
  if (quantity > 1) {
    quantity--;

    quantityText.textContent = quantity;
  }
});

/* ================================
   THÊM VÀO GIỎ
================================ */

addCartBtn.addEventListener("click", function () {
  addToCart();
});

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(function (item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: product.id,

      name: product.name,

      brand: product.brand,

      price: product.price,

      image: product.image,

      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  cartMessage.textContent = "Đã thêm sản phẩm vào giỏ hàng.";
}

/* ================================
   MUA NGAY
================================ */

buyNowBtn.addEventListener("click", function () {
  addToCart();

  window.location.href = "cart.html";
});

/* ================================
   ACCOUNT
================================ */

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

/* ================================
   LOGOUT
================================ */

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("username");

  localStorage.removeItem("rememberLogin");

  window.location.reload();
});
