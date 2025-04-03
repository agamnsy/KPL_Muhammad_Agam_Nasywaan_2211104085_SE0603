class SayaTubeVideo {
    constructor(title) {
        if (!title || title.length > 100) {
            throw new Error("Judul video tidak boleh kosong dan maksimal 100 karakter.");
        }

        this.id = Math.floor(10000 + Math.random() * 90000); // Generate ID acak 5 digit
        this.title = title;
        this.playCount = 0;
    }

    IncreasePlayCount(count) {
        try {
            if (typeof count !== "number" || count <= 0 || count > 10000000) {
                throw new Error("Penambahan play count harus antara 1 hingga 10.000.000.");
            }

            if (this.playCount + count > Number.MAX_SAFE_INTEGER) {
                throw new Error("Play count melebihi batas maksimum integer.");
            }

            this.playCount += count;
        } catch (error) {
            console.error(`${error.message}`);
        }
    }

    PrintVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

function main() {
    try {
        const video = new SayaTubeVideo("Tutorial Design By Contract - Muhammad Agam Nasywaan");
        
        // Uji batas maksimal play count (overflow)
        for (let i = 0; i < 10; i++) {
            video.IncreasePlayCount(10000000); // Tambah 10 juta setiap iterasi
        }

        video.PrintVideoDetails();
    } catch (error) {
        console.error(`${error.message}`);
    }
}

main();