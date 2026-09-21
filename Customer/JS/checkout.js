/* ========================================
   CHECKOUT
======================================== */

/* ================================
   LẤY PHẦN TỬ
================================ */

const checkoutForm = document.getElementById("checkoutForm");

const checkoutProducts = document.getElementById("checkoutProducts");

const subTotal = document.getElementById("subTotal");

const totalPrice = document.getElementById("totalPrice");

const checkoutError = document.getElementById("checkoutError");

const successOverlay = document.getElementById("successOverlay");

const homeBtn = document.getElementById("homeBtn");

/* ================================
   LẤY GIỎ HÀNG
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================================
   ĐỊNH DẠNG TIỀN
================================ */

function formatMoney(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

/* ================================
   KIỂM TRA GIỎ HÀNG
================================ */

function checkCart() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống.");

    window.location.href = "product.html";

    return false;
  }

  return true;
}

/* ================================
   HIỂN THỊ SẢN PHẨM
================================ */

function displayCheckoutProducts() {
  checkoutProducts.innerHTML = "";

  let total = 0;

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const product = document.createElement("div");

    product.className = "checkout-product";

    product.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}">


            <div class="checkout-product-info">

                <h3>
                    ${item.name}
                </h3>

                <span>
                    Số lượng: ${item.quantity}
                </span>

            </div>


            <div class="checkout-product-price">

                ${formatMoney(itemTotal)}

            </div>

        `;

    checkoutProducts.appendChild(product);
  });

  subTotal.textContent = formatMoney(total);

  totalPrice.textContent = formatMoney(total);
}

/* ================================
   KIỂM TRA THÔNG TIN
================================ */

function validateForm() {
  const fullname = document.getElementById("fullname").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const address = document.getElementById("address").value.trim();

  const city = document.getElementById("city").value.trim();

  const district = document.getElementById("district").value.trim();

  /* Kiểm tra họ tên */

  if (fullname === "") {
    checkoutError.textContent = "Vui lòng nhập họ và tên.";

    return false;
  }

  /* Kiểm tra số điện thoại */

  if (phone === "") {
    checkoutError.textContent = "Vui lòng nhập số điện thoại.";

    return false;
  }

  if (!/^[0-9]{10,11}$/.test(phone)) {
    checkoutError.textContent = "Số điện thoại không hợp lệ.";

    return false;
  }

  /* Kiểm tra địa chỉ */

  if (address === "") {
    checkoutError.textContent = "Vui lòng nhập địa chỉ.";

    return false;
  }

  /* Kiểm tra tỉnh / thành phố */

  if (city === "") {
    checkoutError.textContent = "Vui lòng nhập tỉnh / thành phố.";

    return false;
  }

  /* Kiểm tra quận / huyện */

  if (district === "") {
    checkoutError.textContent = "Vui lòng nhập quận / huyện.";

    return false;
  }

  checkoutError.textContent = "";

  return true;
}

/* ================================
   THANH TOÁN
================================ */

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  checkoutError.textContent = "";

  /* Kiểm tra giỏ hàng */

  if (!checkCart()) {
    return;
  }

  /* Kiểm tra thông tin */

  if (!validateForm()) {
    return;
  }

  /* ================================
     THANH TOÁN THÀNH CÔNG
  ================================= */

  /* Xóa giỏ hàng */

  localStorage.removeItem("cart");

  /* Hiện thông báo thành công */

  successOverlay.classList.add("show");
});

/* ================================
   NÚT VỀ TRANG CHỦ
================================ */

homeBtn.addEventListener("click", function () {
  window.location.href = "dashboard.html";
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

/* ================================
   KHỞI ĐỘNG
================================ */

if (checkCart()) {
  displayCheckoutProducts();
}
