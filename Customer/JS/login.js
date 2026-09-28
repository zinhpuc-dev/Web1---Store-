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

       KHÔNG CHECK:
       - Email
       - Mật khẩu
       - Định dạng email
       - Nội dung form
    ======================================== */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      /*
       * Bấm Đăng nhập
       * = chuyển sang trạng thái
       * đã có tài khoản.
       */

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

      /*
       * Chuyển về trang chủ.
       */

      window.location.href = "dashboard.html";
    });
  }

  /* ========================================
       ĐĂNG XUẤT
    ======================================== */

  window.logout = function () {
    localStorage.setItem(LOGIN_KEY, "false");

    window.location.href = "dashboard.html";
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
       THAY ĐỔI GIAO DIỆN

       CHƯA ĐĂNG NHẬP:
       Tài khoản

       ĐÃ ĐĂNG NHẬP:
       Xin chào, Zinh
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

    if (isLoggedIn()) {
      /*
       * ĐÃ ĐĂNG NHẬP
       */

      const account = getAccount();

      const fullName = account.fullName || "Zinh";

      /*
       * THAY TRỰC TIẾP CHỮ "Tài khoản"
       * THÀNH "Xin chào, Zinh"
       */
      accountLink.textContent = "Xin chào, " + fullName;

      /*
       * Bấm "Xin chào, Zinh"
       * -> trang thông tin cá nhân
       */
      accountLink.href = "profile.html";

      /*
       * Tạo nút Đăng xuất
       */

      let logoutButton = accountBox.querySelector(".logout-btn");

      if (!logoutButton) {
        logoutButton = document.createElement("button");

        logoutButton.className = "logout-btn";

        logoutButton.type = "button";

        logoutButton.textContent = "Đăng xuất";

        logoutButton.addEventListener("click", window.logout);

        accountBox.appendChild(logoutButton);
      }

      /*
       * Hiện nút Đăng xuất
       */

      logoutButton.style.display = "inline-block";
    } else {
      /*
       * CHƯA ĐĂNG NHẬP
       */

      accountLink.href = "login.html";

      /*
       * Hiển thị lại "Tài khoản"
       */

      accountLink.textContent = "Tài khoản";

      /*
       * Ẩn nút Đăng xuất
       */

      const logoutButton = accountBox.querySelector(".logout-btn");

      if (logoutButton) {
        logoutButton.style.display = "none";
      }
    }
  }

  /* ========================================
       BẢO VỆ CHỨC NĂNG CẦN TÀI KHOẢN
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
       KHI TRANG LOAD
    ======================================== */

  document.addEventListener("DOMContentLoaded", function () {
    /*
     * Thay đổi giao diện
     * theo trạng thái tài khoản.
     */

    updateAccountUI();

    /*
     * Bảo vệ chức năng
     */

    protectAccountLink();
  });
})();
