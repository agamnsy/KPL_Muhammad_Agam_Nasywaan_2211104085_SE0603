class DataGeneric {
    constructor(data) {
        this.data = data;
    }

    PrintData() {
        console.log(`\nData yang tersimpan adalah: ${this.data}\n`);
    }
}

function main() {
    const nim = "2211104085";
    const dataGeneric = new DataGeneric(nim);
    dataGeneric.PrintData();
}

main();