class SayaTubeVideo {
    constructor(title) {
        if (!title || title.length > 200) {
            throw new Error("Judul video harus tidak null dan maksimal 200 karakter.");
        }
        
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.title = title;
        this.playCount = 0;
    }

    IncreasePlayCount(count) {
        if (typeof count !== 'number' || count < 0 || count > 25000000) {
            throw new Error("Jumlah play count harus bernilai positif dan maksimal 25.000.000.");
        }
        
        try {
            if (this.playCount + count > Number.MAX_SAFE_INTEGER) {
                throw new Error("Play count melebihi batas maksimum integer.");
            }
            this.playCount += count;
        } catch (error) {
            console.error(error.message);
        }
    }

    PrintVideoDetails() {
        console.log(`Video ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Play Count: ${this.playCount}`);
    }
}

class SayaTubeUser {
    constructor(username) {
        if (!username || username.length > 100) {
            throw new Error("Username tidak boleh kosong dan maksimal 100 karakter.");
        }
        
        this.id = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit ID
        this.username = username;
        this.uploadedVideos = [];
    }

    AddVideo(video) {
        if (!(video instanceof SayaTubeVideo) || video.playCount > Number.MAX_SAFE_INTEGER) {
            throw new Error("Video tidak valid atau memiliki play count melebihi batas integer.");
        }
        this.uploadedVideos.push(video);
    }

    GetTotalVideoPlayCount() {
        return this.uploadedVideos.reduce((sum, video) => sum + video.playCount, 0);
    }

    PrintAllVideoPlaycount() {
        console.log(`User: ${this.username}`);
        this.uploadedVideos.slice(0, 8).forEach((video, index) => {
            console.log(`Video ${index + 1} judul: ${video.title}`);
        });
    }
}

function main() {
    try {
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
            try {
                let video = new SayaTubeVideo(title);
                video.IncreasePlayCount(Math.floor(Math.random() * 1000));
                user.AddVideo(video);
            } catch (error) {
                console.error(error.message);
            }
        });

        user.PrintAllVideoPlaycount();
        console.log(`Total Play Count: ${user.GetTotalVideoPlayCount()}`);

        // Menguji exception untuk play count overflow
        try {
            let testVideo = new SayaTubeVideo("Test Overflow Video");
            for (let i = 0; i < 10; i++) {
                testVideo.IncreasePlayCount(25000000);
            }
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error(error.message);
    }
}

main();
