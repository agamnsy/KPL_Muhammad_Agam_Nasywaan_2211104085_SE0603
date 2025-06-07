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
