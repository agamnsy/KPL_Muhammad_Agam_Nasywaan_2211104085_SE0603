const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Username dan password tidak boleh kosong.";
    return;
  }
  try {
    const response = await window.electronAPI.loginUser({ username, password });

    if (response.success) {
      message.style.color = "green";
      message.textContent = response.message;
    } else {
      message.style.color = "red";
      message.textContent = response.message;
    }
  } catch (error) {
    console.error("Error during login IPC:", error);
    message.style.color = "red";
    message.textContent = "Terjadi kesalahan saat mencoba login.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      message.textContent = "Username dan password tidak boleh kosong.";
      return;
    }

    try {
      const response = await window.electronAPI.loginUser({ username, password });

      if (response.success) {
        message.style.color = "green";
        message.textContent = response.message;
      } else {
        message.style.color = "red";
        message.textContent = response.message;
      }
    } catch (error) {
      console.error("Error during login IPC:", error);
      message.style.color = "red";
      message.textContent = "Terjadi kesalahan saat mencoba login.";
    }
  });

  const goToRegisterLink = document.getElementById("goToRegister");
  if (goToRegisterLink) {
    goToRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });
  }
});
