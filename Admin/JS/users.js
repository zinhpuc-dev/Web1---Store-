document.addEventListener("DOMContentLoaded", function () {
  const lockButtons = document.querySelectorAll(
    '[data-action="lock"], [data-action="unlock"]',
  );

  lockButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const row = button.closest("tr");
      const badge = row.querySelector(".badge");

      if (!badge) {
        return;
      }

      if (button.dataset.action === "lock") {
        badge.textContent = "Đã khóa";
        badge.classList.remove("badge-success");
        badge.classList.add("badge-danger");

        button.textContent = "Mở khóa";
        button.classList.remove("btn-danger");
        button.classList.add("btn-primary");

        button.dataset.action = "unlock";
      } else {
        badge.textContent = "Hoạt động";
        badge.classList.remove("badge-danger");
        badge.classList.add("badge-success");

        button.textContent = "Khóa";
        button.classList.remove("btn-primary");
        button.classList.add("btn-danger");

        button.dataset.action = "lock";
      }
    });
  });
});
