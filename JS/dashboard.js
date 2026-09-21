// ========================================
// TÀI KHOẢN
// ========================================

const accountLink =
    document.getElementById("accountLink");

const logoutBtn =
    document.getElementById("logoutBtn");


// Lấy tài khoản đã đăng nhập
const username =
    localStorage.getItem("username");


// ========================================
// ĐÃ ĐĂNG NHẬP
// ========================================

if (username) {

    // Hiển thị email
    accountLink.textContent = username;

    // Không chuyển sang trang login
    accountLink.href = "#";

    // Hiện nút đăng xuất
    logoutBtn.style.display = "inline-block";

}


// ========================================
// CHƯA ĐĂNG NHẬP
// ========================================

else {

    // Hiện "Tài khoản"
    accountLink.textContent = "Tài khoản";

    // Link tới login
    accountLink.href = "login.html";

    // Ẩn nút đăng xuất
    logoutBtn.style.display = "none";

}


// ========================================
// ĐĂNG XUẤT
// ========================================

logoutBtn.addEventListener("click", function () {

    // Xóa tài khoản
    localStorage.removeItem("username");

    // Xóa trạng thái ghi nhớ
    localStorage.removeItem("rememberLogin");

    // Quay về dashboard
    window.location.reload();

});