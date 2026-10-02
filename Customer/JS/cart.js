(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const toastNotification = document.getElementById("toastNotification");

    if (!toastNotification) {
      return;
    }

    let toastTimer;

    document.addEventListener("click", function (event) {
      const addCartButton = event.target.closest(".add-cart-btn, #addCartBtn");

      if (!addCartButton) {
        return;
      }

      toastNotification.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(function () {
        toastNotification.classList.remove("show");
      }, 2500);
    });
  });
})();
