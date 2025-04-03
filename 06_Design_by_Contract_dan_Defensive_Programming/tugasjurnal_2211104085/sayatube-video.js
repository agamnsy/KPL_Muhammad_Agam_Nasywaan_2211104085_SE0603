class SayaTubeVideo {
    constructor(title) {
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
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

class SayaTubeUser {
    constructor(username) {
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.username = username;
        this.uploadedVideos = [];
    }

    AddVideo(video) {
        if (video instanceof SayaTubeVideo) {
            this.uploadedVideos.push(video);
        } else {
            console.log("Invalid video instance.");
        }
    }

    GetTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((sum, video) => sum + video.playCount, 0);
    }

    PrintAllVideoPlaycount() {
        console.log(`User: ${this.username}`);
        this.uploadedVideos.forEach((video, index) => {
            console.log(`Video ${index + 1} judul: ${video.title}`);
        });
    }
}

function main() {
    let user = new SayaTubeUser("Agam");

    let videos = [
        "Review Film Avengers oleh Agam",
        "Review Film Thor: Love an Thunder oleh Agam",
        "Review Film Ironman 3 oleh Agam",
        "Review Film Avegers: Age of Ultron oleh Agam",
        "Review Film Guardian of the Galaxy oleh Agam",
        "Review Film The Dark Knight oleh Agam",
        "Review Film Jurassic World Dominion oleh Agam",
        "Review Film Jurassic Park 3 oleh Agam",
        "Review Film Parasite oleh Agam",
        "Review Film Train to Busan oleh Agam"
    ];

    videos.forEach(title => {
        let video = new SayaTubeVideo(title);
        video.IncreasePlayCount(Math.floor(Math.random() * 1000));
        user.AddVideo(video);
    });

    user.PrintAllVideoPlaycount();
    console.log(`Total Play Count: ${user.GetTotalVideoPlayCount()}`);
}

main();
