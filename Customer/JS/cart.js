/* ========================================
   CART
======================================== */

/* ================================
   LẤY PHẦN TỬ
================================ */

const cartList = document.getElementById("cartList");

const cartContent = document.getElementById("cartContent");

const emptyCart = document.getElementById("emptyCart");

const subTotal = document.getElementById("subTotal");

const totalPrice = document.getElementById("totalPrice");

const clearCart = document.getElementById("clearCart");

const checkoutBtn = document.getElementById("checkoutBtn");

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
   HIỂN THỊ GIỎ HÀNG
================================ */

function displayCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartContent.style.display = "none";

    emptyCart.style.display = "block";

    return;
  }

  cartContent.style.display = "grid";

  emptyCart.style.display = "none";

  let total = 0;

  cart.forEach(function (item, index) {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

            <div class="item-product">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <span>
                        ${item.brand}
                    </span>

                </div>

            </div>


            <div class="item-price">

                ${formatMoney(item.price)}

            </div>


            <div class="item-quantity">

                <button
                    class="minus"
                    data-index="${index}">

                    −

                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="plus"
                    data-index="${index}">

                    +

                </button>

            </div>


            <div class="item-total">

                ${formatMoney(itemTotal)}

            </div>


            <button
                class="delete-btn"
                data-index="${index}">

                ×

            </button>

        `;

    cartList.appendChild(cartItem);
  });

  subTotal.textContent = formatMoney(total);

  totalPrice.textContent = formatMoney(total);

  addQuantityEvents();
}

/* ================================
   TĂNG / GIẢM
================================ */

function addQuantityEvents() {
  const minusButtons = document.querySelectorAll(".minus");

  const plusButtons = document.querySelectorAll(".plus");

  const deleteButtons = document.querySelectorAll(".delete-btn");

  minusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      }

      saveCart();
    });
  });

  plusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);

      cart[index].quantity++;

      saveCart();
    });
  });

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      saveCart();
    });
  });
}

/* ================================
   LƯU GIỎ HÀNG
================================ */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

/* ================================
   XÓA TOÀN BỘ
================================ */

clearCart.addEventListener("click", function () {
  if (cart.length === 0) {
    return;
  }

  const confirmDelete = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");

  if (confirmDelete) {
    cart = [];

    saveCart();
  }
});

/* ================================
   THANH TOÁN
================================ */

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống.");

    return;
  }

  window.location.href = "checkout.html";
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

displayCart();
