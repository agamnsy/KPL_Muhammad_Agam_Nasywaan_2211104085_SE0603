const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const result = await window.api.registerUser(username, password);
  message.style.color = result.success ? "green" : "red";
  message.textContent = result.message;
});

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const message = document.getElementById("message");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      message.textContent = "Username dan password tidak boleh kosong.";
      return;
    }

    try {
      const response = await window.electronAPI.registerUser({ username, password });

      if (response.success) {
        message.style.color = "green";
        message.textContent = response.message;
      } else {
        message.style.color = "red";
        message.textContent = response.message;
      }
    } catch (error) {
      console.error("Error during registration IPC:", error);
      message.style.color = "red";
      message.textContent = "Terjadi kesalahan saat mencoba mendaftar.";
    }
  });

  const goToLoginLink = document.getElementById("goToLogin");
  if (goToLoginLink) {
    goToLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }
});
