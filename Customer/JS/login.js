const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  loginError.textContent = "";

  /* KIỂM TRA DỮ LIỆU NHẬP */

  if (email === "") {
    loginError.textContent = "Vui lòng nhập email.";
    return;
  }

  if (password === "") {
    loginError.textContent = "Vui lòng nhập mật khẩu.";
    return;
  }
  /* TÀI KHOẢN KHÁCH HÀNG MẪU */

  if (email !== " " && password !== " ") {
    window.location.href = "dashboard.html";

    return;
  }

  loginError.textContent = "Email hoặc mật khẩu không chính xác.";
});
