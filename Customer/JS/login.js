// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");

// Khi người dùng bấm Đăng nhập
loginForm.addEventListener("submit", function (event) {
  // Không reload trang
  event.preventDefault();

  // Lấy email
  const username = document.getElementById("username").value.trim();

  // Lấy mật khẩu
  const password = document.getElementById("password").value;

  // Kiểm tra dữ liệu nhập
  if (username === "" || password === "") {
    loginMessage.textContent = "Vui lòng nhập đầy đủ thông tin.";

    return;
  }

  // Lưu tài khoản
  localStorage.setItem("username", username);

  // Kiểm tra người dùng có chọn ghi nhớ không
  const remember = document.getElementById("remember").checked;

  if (remember) {
    localStorage.setItem("rememberLogin", "true");
  } else {
    localStorage.removeItem("rememberLogin");
  }

  // Chuyển sang dashboard
  window.location.href = "dashboard.html";
});

// ========================================
// HIỆN / ẨN MẬT KHẨU
// ========================================

const togglePassword = document.getElementById("togglePassword");

const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    togglePassword.classList.remove("fa-eye");

    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";

    togglePassword.classList.remove("fa-eye-slash");

    togglePassword.classList.add("fa-eye");
  }
});
