class SayaTubeVideo {
    constructor(title) {
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate ID acak 5 digit
        this.title = title;
        this.playCount = 0;
    }

    IncreasePlayCount(count) {
        this.playCount += count;
    }

    PrintVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

function main() {
    const video = new SayaTubeVideo("Tutorial Design By Contract - Muhammad Agam Nasywaan");
    video.IncreasePlayCount(238);
    video.PrintVideoDetails();
}

main();
