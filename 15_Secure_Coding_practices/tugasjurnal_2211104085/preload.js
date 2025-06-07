const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  registerUser: (userData) => ipcRenderer.invoke("register-user", userData),

  loginUser: (credentials) => ipcRenderer.invoke("login-user", credentials),
});
