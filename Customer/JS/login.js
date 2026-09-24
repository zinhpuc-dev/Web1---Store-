const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    loginError.textContent = "";

    if (email === "") {
      loginError.textContent = "Vui lòng nhập email.";
      return;
    }
    if (password === "") {
      loginError.textContent = "Vui lòng nhập mật khẩu.";
      return;
    }

    // Giả lập đăng nhập thành công (prototype)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", "Nguyễn Văn A");
    localStorage.setItem("userEmail", email);

    window.location.href = "dashboard.html";
  });
}

// Hàm đăng xuất dùng chung
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}

// Cập nhật header khi đã đăng nhập (gọi ở các trang)
function updateAccountUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const accountLink = document.getElementById("accountLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (accountLink) {
    if (isLoggedIn) {
      accountLink.textContent = localStorage.getItem("userName") || "Tài khoản";
      accountLink.href = "profile.html";
    } else {
      accountLink.textContent = "Tài khoản";
      accountLink.href = "login.html";
    }
  }

  if (logoutBtn) {
    logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
    logoutBtn.onclick = logout;
  }
}

// Chạy khi load trang
document.addEventListener("DOMContentLoaded", updateAccountUI);
