/* ========================================
   CHECKOUT PROCESSOR & ORDERS MANAGEMENT
======================================== */

// Lấy dữ liệu giỏ hàng từ localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Định dạng tiền tệ
function formatPrice(num) {
  return num.toLocaleString("vi-VN") + "đ";
}

// Hiển thị danh sách sản phẩm cần thanh toán
function renderCheckoutSummary() {
  const checkoutProducts = document.getElementById("checkoutProducts");
  const subTotalEl = document.getElementById("subTotal");
  const totalPriceEl = document.getElementById("totalPrice");

  if (!checkoutProducts) return;

  const cart = getCart();

  // Nếu giỏ hàng trống, điều hướng người dùng về trang giỏ hàng
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  let html = "";
  let subTotal = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    subTotal += lineTotal;

    html += `
      <div class="checkout-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
          <div>
            <div style="font-weight: 600;">${item.name}</div>
            <div style="color: #666; font-size: 13px;">SL: ${item.qty}</div>
          </div>
        </div>
        <div style="font-weight: 600; color: #333;">${formatPrice(lineTotal)}</div>
      </div>
    `;
  });

  checkoutProducts.innerHTML = html;
  if (subTotalEl) subTotalEl.textContent = formatPrice(subTotal);
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(subTotal);
}

// Lưu thông tin đơn hàng vào lịch sử "orders"
function saveOrderToHistory(orderData) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Xử lý gửi Form thanh toán
function initCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  const errorEl = document.getElementById("checkoutError");
  const successOverlay = document.getElementById("successOverlay");
  const homeBtn = document.getElementById("homeBtn");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const district = document.getElementById("district").value.trim();
    const note = document.getElementById("note").value.trim();
    const paymentMethod =
      form.querySelector('input[name="payment"]:checked')?.value || "cod";

    // Validate dữ liệu nhập
    if (!fullname || !phone || !address || !city || !district) {
      if (errorEl) {
        errorEl.textContent = "Vui lòng điền đầy đủ thông tin giao hàng!";
        errorEl.style.color = "#ef4444";
        errorEl.style.marginBottom = "10px";
      }
      return;
    }

    if (errorEl) errorEl.textContent = "";

    const cart = getCart();
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );

    // Tạo đối tượng đơn hàng
    const newOrder = {
      orderId: "ZP" + Date.now().toString().slice(-6),
      date: new Date().toLocaleString("vi-VN"),
      customer: { fullname, phone, address, city, district, note },
      paymentMethod:
        paymentMethod === "cod"
          ? "Thanh toán khi nhận hàng"
          : "Chuyển khoản ngân hàng",
      items: cart,
      totalAmount: totalAmount,
      status: "Đang xử lý",
    };

    // 1. Lưu vào danh sách đơn hàng đã đặt
    saveOrderToHistory(newOrder);

    // 2. Xóa giỏ hàng hiện tại
    localStorage.removeItem("cart");

    // 3. Hiển thị Popup Modal thành công
    if (successOverlay) {
      successOverlay.classList.add("active");
    }
  });

  // Nút về trang chủ trên Pop-up
  if (homeBtn) {
    homeBtn.onclick = function () {
      window.location.href = "dashboard.html";
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutSummary();
  initCheckoutForm();
});
