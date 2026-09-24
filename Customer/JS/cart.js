/* ========================================
   CART - LocalStorage Helper
======================================== */

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(num) {
  return num.toLocaleString("vi-VN") + "đ";
}

function requireLogin() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

/* ========================================
   TOAST NOTIFICATION
======================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  if (!toast) return;

  const messageEl = toast.querySelector(".toast-message") || toast;
  if (messageEl) messageEl.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* ========================================
   ADD TO CART
======================================== */
function addToCart(item, showToastNotice = false) {
  if (!requireLogin()) return false;

  const cart = getCart();
  const exist = cart.find((p) => p.id === item.id);

  if (exist) {
    exist.qty += item.qty || 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: item.qty || 1,
    });
  }

  saveCart(cart);

  if (showToastNotice) {
    showToast(`Đã thêm "${item.name}" vào giỏ hàng!`);
  }

  return true;
}

/* ========================================
   PRODUCT PAGE - Danh sách sản phẩm (Card)
======================================== */
function initProductButtons() {
  document.querySelectorAll(".product-card").forEach((card, index) => {
    const name = card.querySelector("h3")?.textContent.trim() || "Sản phẩm";
    const price = Number(card.dataset.price) || 0;
    const image = card.querySelector("img")?.getAttribute("src") || "";
    const id = card.dataset.id || "sp-" + index + "-" + price;
    const stock = card.dataset.stock !== "false";

    if (!card.dataset.id) card.dataset.id = id;

    const cartBtn = card.querySelector(".cart-btn");
    const buyBtn = card.querySelector(".buy-btn");

    if (cartBtn) {
      cartBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!stock) return;
        addToCart({ id, name, price, image, qty: 1 }, true);
      };
    }

    if (buyBtn) {
      buyBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!stock) return;
        if (addToCart({ id, name, price, image, qty: 1 }, false)) {
          window.location.href = "cart.html";
        }
      };
    }
  });
}

/* ========================================
   PRODUCT DETAIL - Trang chi tiết sản phẩm
======================================== */
function initProductDetail() {
  const addBtn = document.getElementById("addCartBtn");
  const buyBtn = document.getElementById("buyNowBtn");
  if (!addBtn && !buyBtn) return;

  const name =
    document
      .querySelector(".product-info h1, .detail-info h1, h1")
      ?.textContent.trim() || "Sản phẩm";
  const priceText =
    document.querySelector(".product-info .price, .detail-price, .price")
      ?.textContent || "0";
  const price = Number(priceText.replace(/\D/g, "")) || 0;
  const image =
    document
      .querySelector(
        ".product-gallery img, .detail-image img, .product-image img",
      )
      ?.getAttribute("src") || "";
  const id = "detail-" + price;

  let qty = 1;
  const qtyEl = document.getElementById("quantity");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");

  if (minusBtn && qtyEl) {
    minusBtn.onclick = function () {
      if (qty > 1) {
        qty--;
        qtyEl.textContent = qty;
      }
    };
  }
  if (plusBtn && qtyEl) {
    plusBtn.onclick = function () {
      qty++;
      qtyEl.textContent = qty;
    };
  }

  if (addBtn) {
    addBtn.onclick = function (e) {
      e.preventDefault();
      addToCart({ id, name, price, image, qty }, true); // Thêm cờ true để kích hoạt Toast
    };
  }

  if (buyBtn) {
    buyBtn.onclick = function (e) {
      e.preventDefault();
      if (addToCart({ id, name, price, image, qty }, false)) {
        window.location.href = "cart.html";
      }
    };
  }
}

/* ========================================
   CART PAGE - Hiển thị trang giỏ hàng
======================================== */
function renderCartPage() {
  const cartList = document.getElementById("cartList");
  const emptyCart = document.getElementById("emptyCart");
  const cartContent = document.getElementById("cartContent");
  if (!cartList) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = "block";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (emptyCart) emptyCart.style.display = "none";
  if (cartContent) cartContent.style.display = "grid";

  let html = "";
  let subTotal = 0;

  cart.forEach((item, index) => {
    const line = item.price * item.qty;
    subTotal += line;

    html += `
      <div class="cart-item">
        <div class="item-product">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <span>Số lượng: ${item.qty}</span>
          </div>
        </div>

        <div class="item-price">${formatPrice(item.price)}</div>

        <div class="item-quantity">
          <button type="button" class="qty-minus" data-index="${index}">−</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-plus" data-index="${index}">+</button>
        </div>

        <div class="item-total">${formatPrice(line)}</div>

        <button type="button" class="delete-btn remove-btn" data-index="${index}" title="Xóa">
          ×
        </button>
      </div>
    `;
  });

  cartList.innerHTML = html;

  const subTotalEl = document.getElementById("subTotal");
  const totalEl = document.getElementById("totalPrice");
  if (subTotalEl) subTotalEl.textContent = formatPrice(subTotal);
  if (totalEl) totalEl.textContent = formatPrice(subTotal);

  // Nút −
  cartList.querySelectorAll(".qty-minus").forEach((btn) => {
    btn.onclick = function () {
      const i = Number(btn.dataset.index);
      const cart = getCart();
      if (cart[i].qty > 1) cart[i].qty--;
      else cart.splice(i, 1);
      saveCart(cart);
      renderCartPage();
    };
  });

  // Nút +
  cartList.querySelectorAll(".qty-plus").forEach((btn) => {
    btn.onclick = function () {
      const i = Number(btn.dataset.index);
      const cart = getCart();
      cart[i].qty++;
      saveCart(cart);
      renderCartPage();
    };
  });

  // Nút xóa
  cartList.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.onclick = function () {
      const i = Number(btn.dataset.index);
      const cart = getCart();
      cart.splice(i, 1);
      saveCart(cart);
      renderCartPage();
    };
  });

  // Xóa toàn bộ
  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) {
    clearBtn.onclick = function () {
      saveCart([]);
      renderCartPage();
    };
  }

  // Thanh toán
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.onclick = function () {
      if (getCart().length === 0) return;
      window.location.href = "checkout.html";
    };
  }
}

/* ========================================
   INIT SỰ KIỆN KHI TRANG DỪNG LOAD
======================================== */
document.addEventListener("DOMContentLoaded", function () {
  initProductButtons();
  initProductDetail();
  renderCartPage();
});
