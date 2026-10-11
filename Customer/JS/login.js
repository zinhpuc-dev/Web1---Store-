(function () {
  "use strict";

  const LOGIN_KEY = "zpLoggedIn";
  const ACCOUNT_KEY = "zpAccount";

  /* ========================================
     KIỂM TRA TRẠNG THÁI TÀI KHOẢN
  ======================================== */

  function isLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === "true";
  }

  /* ========================================
     ĐĂNG NHẬP
     Không kiểm tra email và mật khẩu
  ======================================== */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const account = {
        fullName: "Zinh",
        email: "",
        password: "",
        phone: "",
        address: "",
        district: "",
        city: "",
      };

      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
      localStorage.setItem(LOGIN_KEY, "true");

      /* Chuyển về trang chủ */
      window.location.href = "index.html";
    });
  }

  /* ========================================
     ĐĂNG XUẤT
  ======================================== */

  window.logout = function () {
    localStorage.setItem(LOGIN_KEY, "false");

    /* Chuyển về trang chủ */
    window.location.href = "index.html";
  };

  /* ========================================
     LẤY THÔNG TIN TÀI KHOẢN
  ======================================== */

  function getAccount() {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  /* ========================================
     CẬP NHẬT GIAO DIỆN TÀI KHOẢN
  ======================================== */

  function updateAccountUI() {
    const accountBox = document.querySelector(".account");

    if (!accountBox) {
      return;
    }

    const accountLink = accountBox.querySelector("a");

    if (!accountLink) {
      return;
    }

    /* Tìm nút đăng xuất đã có trong HTML */
    let logoutButton = accountBox.querySelector(".logout-btn");

    /* Nếu chưa có thì tạo nút mới */
    if (!logoutButton) {
      logoutButton = document.createElement("button");
      logoutButton.className = "logout-btn";
      logoutButton.type = "button";
      logoutButton.textContent = "Đăng xuất";

      accountBox.appendChild(logoutButton);
    }

    /*
      SỬA LỖI:
      Gắn sự kiện cho nút dù nút đã có sẵn
      trong HTML hay vừa được JavaScript tạo.
    */
    logoutButton.onclick = window.logout;

    if (isLoggedIn()) {
      /* ĐÃ ĐĂNG NHẬP */

      const account = getAccount();
      const fullName = account.fullName || "Zinh";

      accountLink.textContent = "Xin chào, " + fullName;
      accountLink.href = "profile.html";

      logoutButton.style.display = "inline-block";
    } else {
      /* CHƯA ĐĂNG NHẬP */

      accountLink.href = "login.html";
      accountLink.textContent = "Tài khoản";

      logoutButton.style.display = "none";
    }
  }

  /* ========================================
     BẢO VỆ CÁC CHỨC NĂNG CẦN ĐĂNG NHẬP
  ======================================== */

  function protectAccountLink() {
    if (isLoggedIn()) {
      return;
    }

    document
      .querySelectorAll(
        'a[href="cart.html"],' +
          'a[href="profile.html"],' +
          'a[href="orders.html"],' +
          'a[href="checkout.html"]',
      )
      .forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();

          window.location.href = "login.html";
        });
      });
  }

  /* ========================================
     KHỞI TẠO KHI TRANG TẢI XONG
  ======================================== */

  document.addEventListener("DOMContentLoaded", function () {
    updateAccountUI();
    protectAccountLink();
  });
})();
