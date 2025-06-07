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
