class SimpleDataBase {
    constructor() {
        this.storedData = [];
        this.inputDates = [];
    }

    AddNewData(data) {
        this.storedData.push(data);
        this.inputDates.push(new Date().toUTCString());
    }

    PrintAllData() {
        this.storedData.forEach((data, index) => {
            console.log(`Data ${index + 1} berisi: ${data}, yang disimpan pada waktu UTC: ${this.inputDates[index]}`);
        });
    }
}

function main() {
    const nim = "2211104085";
    const duaDigit1 = 22;
    const duaDigit2 = 11;
    const duaDigit3 = 10;

    const database = new SimpleDataBase();
    database.AddNewData(duaDigit1);
    database.AddNewData(duaDigit2);
    database.AddNewData(duaDigit3);

    database.PrintAllData();
}

main();