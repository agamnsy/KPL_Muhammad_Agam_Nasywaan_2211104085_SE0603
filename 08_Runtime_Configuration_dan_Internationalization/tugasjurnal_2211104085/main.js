const readline = require("readline");
const BankTransferConfig = require("./bank-transfer-config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async function main() {
  const configHandler = new BankTransferConfig();
  const config = configHandler.config;

  const lang = config.lang;
  const prompt = lang === "id" ? "Masukkan jumlah uang yang akan di-transfer: " : "Please insert the amount of money to transfer: ";
  const amountInput = await ask(prompt);
  const amount = parseInt(amountInput);

  const fee = amount <= config.transfer.threshold ? config.transfer.low_fee : config.transfer.high_fee;
  const total = amount + fee;

  if (lang === "id") {
    console.log(`Biaya transfer = ${fee}`);
    console.log(`Total biaya = ${total}`);
    console.log("Pilih metode transfer:");
  } else {
    console.log(`Transfer fee = ${fee}`);
    console.log(`Total amount = ${total}`);
    console.log("Select transfer method:");
  }

  config.methods.forEach((method, i) => {
    console.log(`${i + 1}. ${method}`);
  });

  await ask("> ");

  const confirmPrompt = lang === "id" ? `Ketik "${config.confirmation.id}" untuk mengkonfirmasi transaksi: ` : `Please type "${config.confirmation.en}" to confirm the transaction: `;

  const confirmInput = await ask(confirmPrompt);
  const isConfirmed = (lang === "id" && confirmInput.toLowerCase() === config.confirmation.id.toLowerCase()) || (lang === "en" && confirmInput.toLowerCase() === config.confirmation.en.toLowerCase());

  if (isConfirmed) {
    console.log(lang === "id" ? "Proses transfer berhasil" : "The transfer is completed");
  } else {
    console.log(lang === "id" ? "Transfer dibatalkan" : "Transfer is cancelled");
  }

  rl.close();
})();
