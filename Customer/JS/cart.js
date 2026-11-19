(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const toastNotification = document.getElementById("toastNotification");

    if (!toastNotification) {
      return;
    }

    const cartProducts = document.querySelector(".cart-products");
    const toastMessage = toastNotification.querySelector("span");
    let toastTimer;

    function showToast(message) {
      if (message) {
        toastMessage.textContent = message;
      }

      toastNotification.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(function () {
        toastNotification.classList.remove("show");
      }, 2500);
    }

    document.addEventListener("click", function (event) {
      if (event.target.closest(".add-cart-btn, #addCartBtn")) {
        showToast();
      }
    });

    if (!cartProducts) {
      return;
    }

    cartProducts.addEventListener("click", function (event) {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }

      if (button.matches(".item-quantity button")) {
        const quantity = button.parentElement.querySelector("span");
        const change = button.matches(":first-child") ? -1 : 1;
        quantity.textContent = Math.max(1, Number(quantity.textContent) + change);
      } else if (button.matches(".delete-btn")) {
        showToast("Đã xóa sản phẩm khỏi giỏ hàng!");
      } else if (button.matches(".cart-bottom button")) {
        showToast("Đã xóa tất cả sản phẩm trong giỏ hàng!");
      }
    });
  });
})();
