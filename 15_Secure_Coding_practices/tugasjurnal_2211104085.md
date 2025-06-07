# Laporan Praktikum Konstruksi Perangkat Lunak
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### PENGEMBANGAN DENGAN SECURE CODING PRACTICES

### 1. register.html & register.js

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Register</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 20px;
      }
      form {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        box-sizing: border-box;
      }
      button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      #message {
        margin-top: 10px;
      }
      .navigation-link {
        text-align: center;
        margin-top: 15px;
      }
      .navigation-link a {
        color: #007bff;
        text-decoration: none;
      }
      .navigation-link a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h2>Form Registrasi</h2>
    <form id="registerForm">
      <label>Username:</label><br />
      <input type="text" id="username" required /><br /><br />

      <label>Password:</label><br />
      <input type="password" id="password" required /><br /><br />

      <button type="submit">Daftar</button>
      <p id="message" style="color: red"></p>
    </form>

    <div class="navigation-link">
      <p>Sudah punya akun? <a href="#" id="goToLogin">Login di sini</a></p>
    </div>

    <script src="./register.js"></script>
  </body>
</html>

```

```
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
```

#### Penjelasan Kode
register.html ini adalah UI dari halaman registrasi yang dibuat dengan HTML dan CSS untuk menerima input username dan password dari pengguna, dilengkapi tautan navigasi ke halaman login. Sedangkan, register.js berfungsi sebagai logika client-side yang menangani proses submit form menggunakan JavaScript dengan event listener yang mencegah reload bawaan (e.preventDefault()), mengambil nilai input, dan memanggil fungsi window.electronAPI.registerUser() melalui IPC (inter-process communication) Electron. Kode juga memuat validasi dasar untuk mengecek input tidak kosong, menampilkan pesan hasil registrasi, serta menyediakan navigasi ke halaman login saat tautan diklik.

### 2. login.html & login.js

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Login</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 20px;
      }
      form {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        box-sizing: border-box;
      }
      button {
        padding: 10px 15px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #218838;
      }
      #message {
        margin-top: 10px;
      }
      .navigation-link {
        text-align: center;
        margin-top: 15px;
      }
      .navigation-link a {
        color: #007bff;
        text-decoration: none;
      }
      .navigation-link a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h2>Form Login</h2>
    <form id="loginForm">
      <label>Username:</label><br />
      <input type="text" id="username" required /><br /><br />

      <label>Password:</label><br />
      <input type="password" id="password" required /><br /><br />

      <button type="submit">Login</button>
      <p id="message" style="color: red"></p>
    </form>

    <div class="navigation-link">
      <p>Belum punya akun? <a href="#" id="goToRegister">Daftar di sini</a></p>
    </div>

    <script src="./login.js"></script>
  </body>
</html>

```

```
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

```

#### Penjelasan Kode
login.html menyusun UI form login dengan input untuk username dan password, tombol submit, dan tautan navigasi ke halaman registrasi. Sedangkan, login.js menangani logika saat form disubmit, file ini mencegah perilaku default reload, mengambil nilai input, memeriksa apakah input kosong, lalu mengirim data tersebut ke proses utama melalui window.electronAPI.loginUser() menggunakan IPC. Respon dari proses utama akan ditampilkan sebagai pesan keberhasilan atau kegagalan pada halaman. Selain itu, terdapat juga event listener untuk tautan "Daftar di sini" yang mengarahkan pengguna ke halaman register. Proses ini menjaga keamanan dengan tidak langsung memproses login di renderer, melainkan menyerahkannya ke main process.

### 3. security.js

```
const crypto = require("crypto");

function validateUsername(username) {
  const asciiAlphabetRegex = /^[A-Za-z]+$/;
  return typeof username === "string" && username.length >= 4 && username.length <= 20 && asciiAlphabetRegex.test(username);
}

function validatePassword(password, username) {
  if (typeof password !== "string") return false;

  const lengthValid = password.length >= 8 && password.length <= 20;
  const containsNumber = /\d/.test(password);
  const containsSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const containsLetter = /[A-Za-z]/.test(password);
  const notContainsUsername = !password.toLowerCase().includes(username.toLowerCase());

  return lengthValid && containsNumber && containsSpecial && containsLetter && notContainsUsername;
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPasswordWithSalt(password, salt) {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return hashedPassword;
}

function verifyPasswordWithSalt(plainPassword, storedHash, storedSalt) {
  const inputHash = hashPasswordWithSalt(plainPassword, storedSalt);
  return inputHash === storedHash;
}

module.exports = {
  validateUsername,
  validatePassword,
  generateSalt,
  hashPasswordWithSalt,
  verifyPasswordWithSalt,
};

```

#### Penjelasan Kode
security.js berfungsi sebagai modul keamanan yang menangani validasi input dan manajemen kata sandi dalam aplikasi. Fungsi validateUsername memastikan username hanya terdiri dari huruf alfabet dan memiliki panjang antara 4–20 karakter. Fungsi validatePassword memastikan password memiliki panjang 8–20 karakter, mengandung huruf, angka, karakter spesial, dan tidak mengandung username. Untuk keamanan penyimpanan kata sandi, generateSalt menghasilkan salt acak menggunakan crypto.randomBytes, lalu hashPasswordWithSalt menggabungkan password dengan salt dan mengenkripsinya menggunakan algoritma SHA-256. Fungsi verifyPasswordWithSalt membandingkan hash dari password yang dimasukkan dengan hash yang tersimpan untuk memverifikasi kecocokan.

### 4. preload.js

```
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  registerUser: (userData) => ipcRenderer.invoke("register-user", userData),

  loginUser: (credentials) => ipcRenderer.invoke("login-user", credentials),
});

```

#### Penjelasan Kode
preload.js berfungsi sebagai jembatan aman antara proses renderer (antarmuka pengguna) dan proses utama (main process) dalam aplikasi Electron. Dengan menggunakan contextBridge dari modul electron, file ini mengekspos objek electronAPI ke dalam konteks global halaman web (renderer) melalui window.electronAPI, namun tetap menjaga isolasi dan keamanan aplikasi. Fungsi registerUser dan loginUser dalam objek tersebut masing-masing memanggil kanal IPC (ipcRenderer.invoke) bernama "register-user" dan "login-user" untuk mengirim data pengguna (seperti username dan password) ke proses utama agar dapat diproses lebih lanjut, seperti validasi dan penyimpanan.

### 5. main.js

```
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { validateUsername, validatePassword, generateSalt, hashPasswordWithSalt, verifyPasswordWithSalt } = require("./src/utils/security");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("register.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("register-user", async (event, { username, password }) => {
  const userDataPath = path.join(__dirname, "data", "users.json");
  const dataDir = path.dirname(userDataPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!validateUsername(username)) {
    return { success: false, message: "Username tidak valid" };
  }
  if (!validatePassword(password, username)) {
    return { success: false, message: "Password tidak valid" };
  }

  let users = [];
  if (fs.existsSync(userDataPath) && fs.statSync(userDataPath).size > 0) {
    try {
      users = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.warn("users.json berisi JSON tidak valid. Menginisialisasi ulang.");
        users = [];
        fs.writeFileSync(userDataPath, JSON.stringify(users), "utf-8");
      } else {
        console.error("Gagal membaca users.json:", error);
        return { success: false, message: "Gagal membaca data pengguna." };
      }
    }
  } else {
    console.log("users.json tidak ditemukan atau kosong. Membuat file baru.");
    fs.writeFileSync(userDataPath, JSON.stringify([]), "utf-8");
    users = [];
  }

  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: "Username sudah terdaftar" };
  }

  const salt = generateSalt();
  const hashedPassword = hashPasswordWithSalt(password, salt);
  users.push({ username, password: hashedPassword, salt: salt });

  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
  return { success: true, message: "Registrasi berhasil!" };
});

ipcMain.handle("login-user", async (event, { username, password }) => {
  const userDataPath = path.join(__dirname, "data", "users.json");

  const dataDir = path.dirname(userDataPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!validateUsername(username)) {
    return { success: false, message: "Username tidak valid." };
  }

  let users = [];
  if (fs.existsSync(userDataPath) && fs.statSync(userDataPath).size > 0) {
    try {
      users = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Error: users.json rusak saat mencoba login. Harap periksa file.");
        return { success: false, message: "Terjadi masalah dengan data pengguna. Hubungi administrator." };
      } else {
        console.error("Gagal membaca users.json saat login:", error);
        return { success: false, message: "Gagal memuat data pengguna untuk login." };
      }
    }
  } else {
    return { success: false, message: "Username atau password salah." };
  }

  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

  if (user && user.salt && verifyPasswordWithSalt(password, user.password, user.salt)) {
    return { success: true, message: "Login berhasil!" };
  } else {
    return { success: false, message: "Username atau password salah." };
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

```

#### Penjelasan Kode
File main.js merupakan titik awal aplikasi Electron yang mengatur pembuatan jendela utama, serta menangani logika backend untuk proses registrasi dan login pengguna. Fungsi createWindow() membuat jendela dengan mengaktifkan preload.js sebagai jembatan aman ke renderer, sambil menjaga isolasi konteks dan menonaktifkan integrasi Node.js untuk alasan keamanan. Ketika event register-user dipanggil melalui IPC, fungsi akan memvalidasi username dan password, membuat direktori dan file users.json jika belum ada, serta menyimpan data pengguna baru setelah hashing password dengan salt. Untuk login, data dalam users.json akan dibaca dan diverifikasi dengan mencocokkan hash password dan salt milik pengguna. Semua proses ini dibungkus dengan penanganan error agar lebih tangguh dan aman. Selain itu, aplikasi akan keluar secara otomatis jika semua jendela ditutup (kecuali di macOS), menjaga perilaku lintas platform yang konsisten.

#### Output Kode
![Image](https://github.com/user-attachments/assets/f7393378-948e-4568-9274-19f2114ab95c)

![Image](https://github.com/user-attachments/assets/a6787186-2569-457f-8bfd-e57c65b83371)

![Image](https://github.com/user-attachments/assets/5e126683-db44-4b12-8efa-003fe6fbc50e)

![Image](https://github.com/user-attachments/assets/9325544b-66dc-4f25-825c-7c10bd8f51b0)

![Image](https://github.com/user-attachments/assets/1338030a-544f-49d3-9d49-6ef12ef5bca9)

![Image](https://github.com/user-attachments/assets/b028546c-1d29-4357-b0bf-3016656d7f08)

![Image](https://github.com/user-attachments/assets/664ab768-52ca-4a27-b649-1630d5e95d51)